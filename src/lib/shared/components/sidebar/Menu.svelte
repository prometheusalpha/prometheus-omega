<script lang="ts">
  import { page } from "$app/stores";

  import {
    RectangleStack,
    ClipboardDocumentCheck,
    CommandLine,
    CubeTransparent,
    GlobeAlt,
  } from "svelte-heros-v2";

  let colorMap = {
    chat: "text-zinc-300",
    links: "text-zinc-300",
    notes: "text-zinc-300",
    reminders: "text-zinc-300",
  };

  let variationMap = {
    chat: false,
    links: false,
    notes: false,
    reminders: false,
  };

  let resetMap = () => {
    colorMap = {
      chat: "text-zinc-300",
      links: "text-zinc-300",
      notes: "text-zinc-300",
      reminders: "text-zinc-300",
    };
    variationMap = {
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
        colorMap.chat = "text-white";
        variationMap.chat = true;
        break;
      case "/links":
        resetMap();
        colorMap.links = "text-white";
        variationMap.links = true;
        break;
      case "/notes":
        resetMap();
        colorMap.notes = "text-white";
        variationMap.notes = true;
        break;
      case "/reminders":
        resetMap();
        colorMap.reminders = "text-white";
        variationMap.reminders = true;
        break;
    }
  }
</script>

<ul class="space-y-2">
  <li>
    <a
      href="/chat"
      class="my-6 flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
    >
      <CubeTransparent class="h-6 w-6 dark:text-white" />
    </a>
  </li>
  <li>
    <a
      href="/chat"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 hover:bg-zinc-100 dark:text-white dark:{variationMap.chat
        ? ''
        : 'hover:'}bg-zinc-700"
    >
      <CommandLine
        variation={variationMap.chat ? "solid" : "outline"}
        class="h-6 w-6 {colorMap.chat}"
      />
    </a>
  </li>
  <li>
    <a
      href="/links"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 hover:bg-zinc-100 dark:text-white dark:{variationMap.links
        ? ''
        : 'hover:'}bg-zinc-700"
    >
      <GlobeAlt
        variation={variationMap.links ? "solid" : "outline"}
        class="h-6 w-6 {colorMap.links}"
      />
    </a>
  </li>
  <li>
    <a
      href="/notes"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 hover:bg-zinc-100 dark:text-white dark:{variationMap.notes
        ? ''
        : 'hover:'}bg-zinc-700"
    >
      <ClipboardDocumentCheck
        variation={variationMap.notes ? "solid" : "outline"}
        class="h-6 w-6 {colorMap.notes}"
      />
    </a>
  </li>
  <li>
    <a
      href="/reminders"
      class="flex items-center rounded-lg p-2 text-base font-normal text-zinc-950 hover:bg-zinc-100 dark:text-white dark:{variationMap.reminders
        ? ''
        : 'hover:'}bg-zinc-700"
    >
      <RectangleStack
        variation={variationMap.reminders ? "solid" : "outline"}
        class="h-6 w-6 {colorMap.reminders}"
      />
    </a>
  </li>
</ul>
