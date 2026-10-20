<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { showToast } from '$lib/stores/uiNotifications.svelte';

  interface BookItem {
    id: string;
    title: string;
    author: string;
    format: 'PDF' | 'EPUB' | 'LaTeX';
    pages: number;
    progressPercent: number;
    category: string;
    coverColor: string;
  }

  let books = $state<BookItem[]>([
    {
      id: 'book-1',
      title: 'Desain Sistem Terdistribusi Modern',
      author: 'Cecep Saeful Azhar, ST',
      format: 'PDF',
      pages: 320,
      progressPercent: 68,
      category: 'Teknologi',
      coverColor: 'bg-amber-600',
    },
    {
      id: 'book-2',
      title: 'Arsitektur Kriptografi Zero-Knowledge',
      author: 'Fathforce Sovereign Lab',
      format: 'LaTeX',
      pages: 180,
      progressPercent: 42,
      category: 'Keamanan',
      coverColor: 'bg-teal-600',
    },
    {
      id: 'book-3',
      title: 'Fikih Muamalah & Ekonomi Syariah',
      author: 'Ustadz Dr. Harun Hidayat',
      format: 'EPUB',
      pages: 450,
      progressPercent: 95,
      category: 'Kajian',
      coverColor: 'bg-emerald-600',
    },
    {
      id: 'book-4',
      title: 'Handbook Manajemen Basis Data Skala Besar',
      author: 'Cecep Azhar & Tim DBA',
      format: 'PDF',
      pages: 260,
      progressPercent: 15,
      category: 'Teknologi',
      coverColor: 'bg-blue-600',
    },
  ]);

  let searchQuery = $state('');
  let filterFormat = $state('ALL');

  let filteredBooks = $derived(
    books.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      const matchFormat = filterFormat === 'ALL' || b.format === filterFormat;
      return matchQuery && matchFormat;
    })
  );

  function openBook(b: BookItem) {
    window.location.href = `/player?id=${b.id}`;
  }
</script>

<div class="flex flex-col h-full overflow-y-auto px-6 py-5 space-y-4 max-w-7xl mx-auto w-full">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-mono font-bold text-xs shadow-2xs">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div>
        <h1 class="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">Digital Library Hub</h1>
        <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Koleksi buku digital, PDF, EPUB, dan dokumen publikasi LaTeX</p>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        onclick={() => showToast('Pilih dokumen PDF, EPUB, atau LaTeX dari file manager.', 'info')}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition-colors cursor-pointer"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Tambah Dokumen</span>
      </button>
    </div>
  </div>

  <!-- Search & Filters -->
  <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
    <div class="relative flex-1 max-w-md">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Cari judul buku, penulis, atau kata kunci..."
        class="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
    </div>

    <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
      {#each ['ALL', 'PDF', 'EPUB', 'LaTeX'] as fmt}
        <button
          onclick={() => (filterFormat = fmt)}
          class={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filterFormat === fmt ? 'bg-amber-500 text-white font-semibold' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
        >
          {fmt}
        </button>
      {/each}
    </div>
  </div>

  <!-- Library Grid -->
  {#if filteredBooks.length === 0}
    <EmptyState
      title="Tidak ada dokumen ditemukan"
      description="Coba ubah kata kunci pencarian atau filter format dokumen."
      icon="book-open"
    />
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
      {#each filteredBooks as book (book.id)}
        <div
          class="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer"
          onclick={() => openBook(book)}
        >
          <!-- Book Cover Simulation -->
          <div class={`h-36 rounded-xl ${book.coverColor} p-4 flex flex-col justify-between text-white shadow-inner relative overflow-hidden`}>
            <div class="flex items-center justify-between text-[10px] font-mono tracking-wider font-semibold opacity-80 uppercase">
              <span>{book.format}</span>
              <span>{book.pages} Hal.</span>
            </div>
            <div class="space-y-1">
              <h3 class="font-bold text-sm leading-snug line-clamp-2">{book.title}</h3>
              <p class="text-[10px] opacity-90 truncate">{book.author}</p>
            </div>
          </div>

          <!-- Progress Bar & Reading Status -->
          <div class="space-y-1.5 pt-1">
            <div class="flex justify-between items-center text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
              <span>Progress Membaca</span>
              <span class="font-bold text-amber-600 dark:text-amber-400">{book.progressPercent}%</span>
            </div>
            <div class="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div class="h-full bg-amber-500 rounded-full transition-all duration-300" style={`width: ${book.progressPercent}%`}></div>
            </div>
          </div>

          <!-- Bottom Footer -->
          <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {book.category}
            </span>
            <button
              onclick={(e) => { e.stopPropagation(); openBook(book); }}
              class="text-amber-600 dark:text-amber-400 hover:underline font-semibold text-[11px]"
            >
              Baca Sekarang →
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
