<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';
  import { showToast } from '$lib/stores/uiNotifications.svelte';

  interface NoteEntry {
    id: string;
    playlist_id: string;
    item_id: string;
    note_type: 'note' | 'bookmark' | 'highlight';
    timestamp_ms?: number | null;
    page_number?: number | null;
    content: string;
    created_at: number;
  }

  let notes = $state<NoteEntry[]>([
    {
      id: 'note-1',
      playlist_id: 'default',
      item_id: 'book-1',
      note_type: 'highlight',
      page_number: 14,
      content: 'Kunci enkripsi zero-knowledge harus selalu diturunkan pada perangkat lokal (Argon2id KDF).',
      created_at: Date.now() - 3600 * 1000,
    },
    {
      id: 'note-2',
      playlist_id: 'default',
      item_id: 'book-2',
      note_type: 'note',
      timestamp_ms: 145000,
      content: 'Penting untuk ujian: pelajari perbedaan arsitektur Monolitik vs Microservices terdistribusi.',
      created_at: Date.now() - 7200 * 1000,
    },
  ]);

  let searchQuery = $state('');
  let isAddOpen = $state(false);
  let newContent = $state('');
  let newPage = $state(1);

  onMount(async () => {
    try {
      const remote = await invoke<NoteEntry[]>('list_notes', { playlistId: 'default' });
      if (remote && remote.length > 0) {
        notes = remote;
      }
    } catch {
      // Keep sample local notes
    }
  });

  async function handleAddNote() {
    if (!newContent.trim()) return;
    const entry: NoteEntry = {
      id: 'note-' + Date.now(),
      playlist_id: 'default',
      item_id: 'book-1',
      note_type: 'note',
      page_number: newPage,
      content: newContent.trim(),
      created_at: Date.now(),
    };

    try {
      await invoke('save_note', { entry });
      notes = [entry, ...notes];
      newContent = '';
      isAddOpen = false;
      showToast('Catatan berhasil ditambahkan.', 'success');
    } catch {
      notes = [entry, ...notes];
      newContent = '';
      isAddOpen = false;
      showToast('Catatan disimpan lokal.', 'success');
    }
  }

  async function handleDeleteNote(id: string) {
    try {
      await invoke('delete_note', { id });
      notes = notes.filter((n) => n.id !== id);
      showToast('Catatan dihapus.', 'info');
    } catch {
      notes = notes.filter((n) => n.id !== id);
    }
  }
</script>

<div class="flex flex-col h-full overflow-y-auto px-6 py-5 space-y-4 max-w-7xl mx-auto w-full">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-mono font-bold text-xs shadow-2xs">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625A2.25 2.25 0 0 0 3.375 3.375v17.25A2.25 2.25 0 0 0 5.625 22.875h7.125" />
        </svg>
      </div>
      <div>
        <h1 class="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">Time-Synced & Page Notes</h1>
        <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Catatan terikat nomor halaman atau detik video untuk lompat cepat</p>
      </div>
    </div>

    <button
      onclick={() => (isAddOpen = true)}
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition-colors cursor-pointer"
    >
      + Tambah Catatan
    </button>
  </div>

  <!-- Notes Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
    {#each notes as note (note.id)}
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-[10px] font-mono">
            <span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-semibold uppercase">
              {note.note_type}
            </span>
            <span class="text-neutral-400">
              {note.page_number ? `Halaman ${note.page_number}` : `${Math.floor((note.timestamp_ms || 0) / 1000)} detik`}
            </span>
          </div>

          <p class="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
            {note.content}
          </p>
        </div>

        <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <a href={`/player?page=${note.page_number || 1}`} class="text-amber-600 dark:text-amber-400 hover:underline text-xs font-semibold">
            Lompat ke Lokasi →
          </a>
          <button
            onclick={() => handleDeleteNote(note.id)}
            class="text-neutral-400 hover:text-rose-500 text-xs transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if isAddOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
    <div class="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-2xl space-y-4 text-xs">
      <div class="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <h3 class="font-bold text-sm text-neutral-900 dark:text-white">Tambah Catatan Belajar</h3>
        <button onclick={() => (isAddOpen = false)} class="text-neutral-400 hover:text-white">✕</button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-[11px] font-semibold text-neutral-500 uppercase mb-1">Nomor Halaman</label>
          <input type="number" bind:value={newPage} class="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none" />
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-neutral-500 uppercase mb-1">Isi Catatan</label>
          <textarea rows={4} bind:value={newContent} placeholder="Tulis catatan atau poin penting..." class="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none resize-none"></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <button onclick={() => (isAddOpen = false)} class="px-3 py-1.5 rounded-lg text-neutral-500 hover:text-white">Batal</button>
        <button onclick={handleAddNote} class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold">Simpan Catatan</button>
      </div>
    </div>
  </div>
{/if}
