<script lang="ts">
  import {
    CalendarDays,
    ClipboardDocumentCheck,
    CommandLine,
    Link,
  } from "svelte-heros-v2";
</script>

<ul class="flex justify-around bg-zinc-800 py-2 pb-8">
  <li>
    <a
      href="/chat"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 dark:text-white"
    >
      <CommandLine class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
  <li>
    <a
      href="/links"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 dark:text-white"
    >
      <Link class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
  <li>
    <a
      href="/notes"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 dark:text-white"
    >
      <ClipboardDocumentCheck class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
  <li>
    <a
      href="/reminders"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 dark:text-white"
    >
      <CalendarDays class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
</ul>
