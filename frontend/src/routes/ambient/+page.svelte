<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';
  import { showToast } from '$lib/stores/uiNotifications.svelte';

  interface ChannelState {
    sound_id: string;
    volume: number;
    muted: boolean;
  }

  interface DuckingMode {
    name: string;
    multiplier: number;
  }

  let ambientConfig = $state<{
    master_volume: number;
    channels: ChannelState[];
    ducking_mode: DuckingMode;
  } | null>(null);

  let isPlaying = $state(false);
  let isDucking = $state(false);

  const BUILT_IN_PRESETS = [
    { id: 'preset-deep-study', name: 'Deep Study', description: 'Hujan lebat & Ombak pelam untuk konsentrasi penuh' },
    { id: 'preset-focus-work', name: 'Kajian Malam', description: 'Suara api unggun & burung hutan tenang' },
    { id: 'preset-relaxation', name: 'Baca Ebook Santai', description: 'Desiran angin & bunyi kafe rendah' }
  ];

  const AVAILABLE_SOUNDS = [
    { id: 'rain_heavy', name: 'Hujan Lebat (Thunder)', active: false, volume: 0.5 },
    { id: 'ocean_waves', name: 'Ombak Pantai', active: false, volume: 0.3 },
    { id: 'forest_birds', name: 'Burung Hutan', active: false, volume: 0.7 },
    { id: 'coffee_shop', name: 'Kedai Kopi', active: false, volume: 0.2 },
    { id: 'fireplace', name: 'Api Unggun', active: false, volume: 0.6 },
    { id: 'wind_leaves', name: 'Angin & Daun', active: false, volume: 0.4 },
  ];

  let activeSounds = $state(AVAILABLE_SOUNDS);

  onMount(async () => {
    try {
      const cfg = await invoke<any>('get_ambient_config');
      ambientConfig = {
        master_volume: 0.85,
        channels: cfg?.channels || [],
        ducking_mode: { name: 'Auto Duck', multiplier: 0.25 }
      };
    } catch {
      ambientConfig = {
        master_volume: 0.85,
        channels: [],
        ducking_mode: { name: 'Auto Duck', multiplier: 0.25 }
      };
    }
  });

  function toggleSound(id: string) {
    activeSounds = activeSounds.map((s) => (s.id === id ? { ...s, active: !s.active } : s));
    if (ambientConfig) {
      ambientConfig.channels = activeSounds.filter((s) => s.active).map((s) => ({
        sound_id: s.id,
        volume: s.volume,
        muted: false
      }));
    }
    showToast(`${id === 'rain_heavy' ? 'Hujan Lebat' : id} berhasil diaktifkan!`, 'success');
  }

  async function saveAmbientConfig() {
    try {
      if (ambientConfig) {
        await invoke('save_ambient_config', { config: ambientConfig });
        showToast('Pengaturan ambient fokus tersimpan.', 'success');
      }
    } catch (e: any) {
      showToast(e?.message || 'Gagal menyimpan preset.', 'error');
    }
  }
</script>

<div class="flex flex-col h-full overflow-y-auto p-4 max-w-7xl mx-auto w-full space-y-4">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-mono font-bold text-xs shadow-2xs">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18v-3.255a7.005 7.005 0 0 0-7-7 7.005 7.005 0 0 1 7-7 7.005 7.005 0 0 1 7 7 7.005 7.005 0 0 0-7 7V18M3.04 14.858a9.001 9.001 0 0 0 17.92 0" />
        </svg>
      </div>
      <div>
        <h2 class="text-sm font-bold text-neutral-900 dark:text-white">Ambient Focus Studio & Suara Latar</h2>
        <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Mixer multi-layer, ducking otomatis, dan timer pomodoro untuk belajar</p>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        disabled={activeSounds.every((s) => !s.active)}
        onclick={() => (isPlaying = !isPlaying)}
        class={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white rounded-lg transition-colors shadow-sm ${isPlaying ? 'bg-rose-600 hover:bg-rose-500' : 'bg-amber-600 hover:bg-amber-500'}`}
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isPlaying ? "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832L14.752 12.83a1 1 0 000-1.662z"} />
        </svg>
        <span>{isPlaying ? 'Pause Semuanya' : 'Putar Fokus'}</span>
      </button>

      <button
        onclick={saveAmbientConfig}
        class="px-3 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition-colors"
      >
        Simpan Preset
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
    <!-- Multi-Channel Mixer -->
    <div class="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-2xs space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Mixer Ambient (8 layer aktif maksimal)</span>
        <div class="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
          <span>Master Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={ambientConfig?.master_volume ?? 0.85}
            onchange={(e) => {
              if (ambientConfig) ambientConfig.master_volume = parseFloat(e.target.value);
            }}
            class="w-24 accent-amber-500"
          />
          <span class="text-amber-500 font-bold text-xs">{Math.round((ambientConfig?.master_volume ?? 0.85) * 100)}%</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {#each activeSounds as sound}
          <div
            class={`p-3.5 rounded-xl border transition-all ${sound.active ? 'border-amber-500/50 bg-amber-50 dark:bg-amber-950/20' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900'}`}
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <button
                  onclick={() => toggleSound(sound.id)}
                  class={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${sound.active ? 'bg-amber-500 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}
                >
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d={sound.active ? "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832L14.752 12.83a1 1 0 000-1.662z"} />
                  </svg>
                </button>
                <span class="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{sound.name}</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono text-neutral-400">Vol</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sound.volume}
                onchange={(e) => (sound.volume = parseFloat(e.target.value))}
                class="flex-1 accent-amber-500"
                disabled={!sound.active}
              />
              <span class="text-[10px] font-mono text-amber-500 font-bold w-8 text-right">{Math.round(sound.volume * 100)}%</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Auto Ducking & Built-in Presets Panel -->
    <div class="space-y-4">
      <!-- Ducking Setting -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
          Auto Ducking (Reduksi Suara)
        </span>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Saat media video / buku audio di player sedang <b>bermain</b>, volume latar otomatis turun ke
          level lebih rendah (default -12dB / 25%).
        </p>

        <div class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/80">
          <input
            type="checkbox"
            id="ducking-toggle"
            checked={isDucking}
            onchange={(e) => (isDucking = e.target.checked)}
            class="rounded text-amber-500 focus:ring-amber-500 border-neutral-300"
          />
          <label for="ducking-toggle" class="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Aktifkan Auto Ducking (berlaku otomatis)
          </label>
        </div>
      </div>

      <!-- Built-in Presets List -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
          Preset Bawaan CABook
        </span>

        <div class="space-y-2">
          {#each BUILT_IN_PRESETS as preset}
            <div class="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-colors flex justify-between items-center group">
              <div>
                <div class="text-xs font-bold text-neutral-800 dark:text-neutral-200">{preset.name}</div>
                <div class="text-[10px] text-neutral-400 mt-0.5">{preset.description}</div>
              </div>
              <button
                onclick={() => showToast(`Preset "${preset.name}" dimuat ke mixer.`, 'info')}
                class="px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/50"
              >
                Gunakan
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
