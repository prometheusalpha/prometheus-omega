<script lang="ts">
  // import icon512 from "../../../../../static/icon512.png";

  import {
    CubeTransparent,
    CommandLine,
    Link,
    ClipboardDocumentCheck,
    CalendarDays,
  } from "svelte-heros-v2";
</script>

<ul class="space-y-2">
  <li>
    <a
      href="/chat"
      class="my-6 flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <CubeTransparent class="h-6 w-6 dark:text-white" />
    </a>
  </li>
  <li>
    <a
      href="/chat"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <CommandLine class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
  <li>
    <a
      href="/links"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <Link class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
  <li>
    <a
      href="/notes"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <ClipboardDocumentCheck class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
  <li>
    <a
      href="/reminders"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <CalendarDays class="h-6 w-6 dark:text-zinc-300" />
    </a>
  </li>
</ul>
