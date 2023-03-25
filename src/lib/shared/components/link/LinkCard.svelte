<script lang="ts">
  import type { LinkCardData } from "../../../../routes/links/+page.server";

  export let card: LinkCardData;

  import noimage from "../../../shared/assets/noimage.jpg";
</script>

<a
  target="_blank"
  href={card.link}
  class="flex h-[8rem] justify-between rounded-lg border border-zinc-200 bg-white shadow-md hover:bg-zinc-700
  dark:border-zinc-700 dark:bg-zinc-800"
>
  <div class="flex flex-col justify-between p-5 pr-12">
    <div class="">
      <h5
        class="break-all text-lg font-semibold tracking-tight text-zinc-900 dark:text-white"
      >
        {card.og_title || "Untitled"}
      </h5>
      <p class="text-sm text-zinc-400">
        {card.og_description || "No description"}
      </p>
    </div>
    <div class="text-sm text-zinc-300">
      {card.link}
    </div>
  </div>
  <img
    class="w-[16rem] rounded-r-lg object-cover"
    src={card.og_image || noimage}
    alt=""
  />
</a>
