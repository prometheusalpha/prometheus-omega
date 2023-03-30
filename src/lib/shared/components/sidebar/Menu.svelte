<script lang="ts">
  import { page } from "$app/stores";

  import {
      RectangleStack,
      ClipboardDocumentCheck,
      CommandLine,
      CubeTransparent,
      GlobeAlt
  } from "svelte-heros-v2";

  let solidMap = {
    chat: false,
    links: false,
    notes: false,
    reminders: false,
  };

  let resetMap = () => {
    solidMap = {
      chat: false,
      links: false,
      notes: false,
      reminders: false,
    };
  };

  $: {
    let path = $page.url.pathname;
    switch (path) {
      case "/chat":
        resetMap();
        solidMap.chat = true;
        break;
      case "/links":
        resetMap();
        solidMap.links = true;
        break;
      case "/notes":
        resetMap();
        solidMap.notes = true;
        break;
      case "/reminders":
        resetMap();
        solidMap.reminders = true;
        break;
    }
  }
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
      <CommandLine
        variation={solidMap.chat ? "solid" : "outline"}
        class="h-6 w-6 dark:text-zinc-300"
      />
    </a>
  </li>
  <li>
    <a
      href="/links"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <GlobeAlt
        variation={solidMap.links ? "solid" : "outline"}
        class="h-6 w-6 dark:text-zinc-300"
      />
    </a>
  </li>
  <li>
    <a
      href="/notes"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <ClipboardDocumentCheck
        variation={solidMap.notes ? "solid" : "outline"}
        class="h-6 w-6 dark:text-zinc-300"
      />
    </a>
  </li>
  <li>
    <a
      href="/reminders"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <RectangleStack
        variation={solidMap.reminders ? "solid" : "outline"}
        class="h-6 w-6 dark:text-zinc-300"
      />
    </a>
  </li>
</ul>
