<script lang="ts">
  import { showToast } from '$lib/stores/uiNotifications.svelte';

  let currentPage = $state(1);
  let totalPages = $state(48);
  let zoomLevel = $state(100);
  let isDualPage = $state(false);
  let isNarrationPlaying = $state(false);

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }

  function toggleDual() {
    isDualPage = !isDualPage;
  }
</script>

<div class="flex flex-col h-full overflow-hidden p-4 max-w-7xl mx-auto w-full space-y-3">
  <!-- Top Controls Bar -->
  <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 shrink-0">
    <div class="flex items-center gap-3">
      <a href="/" class="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors" title="Kembali ke Perpustakaan">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      </a>
      <div>
        <h2 class="text-sm font-bold text-neutral-900 dark:text-white truncate max-w-md">Desain Sistem Terdistribusi Modern</h2>
        <p class="text-[10px] text-neutral-500 font-mono">Format: PDF / LaTeX Publication Reader</p>
      </div>
    </div>

    <!-- Reader Navigation & Zoom Controls -->
    <div class="flex items-center gap-2">
      <div class="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-0.5 text-xs">
        <button onclick={prevPage} class="px-2 py-1 rounded hover:bg-white dark:hover:bg-neutral-700 font-semibold" disabled={currentPage <= 1}>←</button>
        <span class="px-2 font-mono text-[11px] text-neutral-700 dark:text-neutral-300">Hal. {currentPage} / {totalPages}</span>
        <button onclick={nextPage} class="px-2 py-1 rounded hover:bg-white dark:hover:bg-neutral-700 font-semibold" disabled={currentPage >= totalPages}>→</button>
      </div>

      <button
        onclick={toggleDual}
        class={`px-2.5 py-1 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 font-medium ${isDualPage ? 'bg-amber-500 text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}`}
      >
        {isDualPage ? '2 Halaman' : '1 Halaman'}
      </button>

      <button
        onclick={() => (isNarrationPlaying = !isNarrationPlaying)}
        class={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-semibold text-white transition-colors ${isNarrationPlaying ? 'bg-rose-600 hover:bg-rose-500' : 'bg-amber-600 hover:bg-amber-500'}`}
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isNarrationPlaying ? "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832L14.752 12.83a1 1 0 000-1.662z"} />
        </svg>
        <span>{isNarrationPlaying ? 'Hentikan Audio' : 'Audio Narasi'}</span>
      </button>
    </div>
  </div>

  <!-- Document Viewport -->
  <div class="flex-1 overflow-auto bg-neutral-100 dark:bg-[#121318] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex justify-center items-start">
    <div class={`grid ${isDualPage ? 'grid-cols-2 gap-4' : 'grid-cols-1'} max-w-4xl w-full`}>
      <!-- Page 1 Viewport -->
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md p-8 min-h-[600px] flex flex-col justify-between text-neutral-800 dark:text-neutral-200">
        <div class="space-y-4">
          <div class="text-[10px] font-mono text-neutral-400 uppercase tracking-widest border-b border-neutral-100 dark:border-neutral-800 pb-2 flex justify-between">
            <span>BAB 1: ARSITEKTUR ZERO-KNOWLEDGE</span>
            <span>HALAMAN {currentPage}</span>
          </div>

          <h1 class="text-xl font-bold text-neutral-900 dark:text-white pt-2">
            1.1 Prinsip Desain Kedaulatan Data Lokal
          </h1>

          <p class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
            Kedaulatan data pengguna adalah prasyarat mutlak dalam membangun sistem modern. Tanpa enkripsi zero-knowledge pada lapisan klien (client-side derivation), setiap rekaman dan dokumen rentan terhadap kebocoran baik pada transit maupun at-rest.
          </p>

          <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-900 dark:text-amber-200 leading-normal">
            Formula Kriptografi Dekripsi Lokal:<br/>
            DEK = Argon2id(MasterPass, Salt, m=64MB, t=3, p=1)<br/>
            Cipher = XChaCha20-Poly1305(Payload, DEK, Nonce)
          </div>

          <p class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
            Dokumen ini disusun menggunakan LaTeX/EPUB rendering engine yang mengoptimalkan tipografi digital dan kenyamanan membaca jarak jauh.
          </p>
        </div>

        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-[10px] font-mono text-neutral-400">
          <span>CABook Multimodal Studio v0.1.1</span>
          <span>{currentPage} of {totalPages}</span>
        </div>
      </div>

      {#if isDualPage}
        <!-- Page 2 Viewport -->
        <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md p-8 min-h-[600px] flex flex-col justify-between text-neutral-800 dark:text-neutral-200">
          <div class="space-y-4">
            <div class="text-[10px] font-mono text-neutral-400 uppercase tracking-widest border-b border-neutral-100 dark:border-neutral-800 pb-2 flex justify-between">
              <span>BAB 1: ARSITEKTUR ZERO-KNOWLEDGE</span>
              <span>HALAMAN {currentPage + 1}</span>
            </div>

            <h2 class="text-lg font-bold text-neutral-900 dark:text-white pt-2">
              1.2 Sinkronisasi Lintas Perangkat HLC
            </h2>

            <p class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              Hybrid Logical Clock (HLC) memastikan penomoran peristiwa kausal tetap terjaga tanpa ketergantungan pada server waktu tersentralisasi (NTP synchronization skew).
            </p>
          </div>

          <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-[10px] font-mono text-neutral-400">
            <span>CABook Multimodal Studio v0.1.1</span>
            <span>{currentPage + 1} of {totalPages}</span>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
