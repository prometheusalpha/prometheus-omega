<script lang="ts">
  import type { LinkCardData } from "../../../../routes/links/+page.server";

  export let card: LinkCardData;

  import noimage from "../../../shared/assets/noimage.jpg";
</script>

<a
  target="_blank"
  href={card.link}
  class="bg-white border border-zinc-200 rounded-lg shadow-md dark:bg-zinc-800 h-[8rem] flex justify-between
  dark:border-zinc-700 hover:bg-zinc-700"
>
  <div class="p-5 flex flex-col justify-between pr-12">
    <div class="">
      <h5
        class="break-all text-lg font-semibold tracking-tight text-zinc-900 dark:text-white"
      >
        {card.og_title || "Untitled"}
      </h5>
      <p class="text-zinc-400 text-sm">
        {card.og_description || "No description"}
      </p>
    </div>
    <div class="text-zinc-300 text-sm">
      {card.link}
    </div>
  </div>
  <img
    class="rounded-r-lg w-[16rem] object-cover"
    src={card.og_image || noimage}
    alt=""
  />
</a>
