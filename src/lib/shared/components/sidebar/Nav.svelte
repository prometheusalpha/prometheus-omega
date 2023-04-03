<script lang="ts">
  import { page } from "$app/stores";

  import {
    ClipboardDocumentCheck,
    CommandLine,
    GlobeAlt,
    RectangleStack,
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

<ul class="flex justify-around bg-zinc-800 py-2 pb-8">
  <li>
    <a
      href="/chat"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 dark:text-white"
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
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 dark:text-white"
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
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 dark:text-white"
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
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 dark:text-white"
    >
      <RectangleStack
        variation={solidMap.reminders ? "solid" : "outline"}
        class="h-6 w-6 dark:text-zinc-300"
      />
    </a>
  </li>
</ul>
