<script lang="ts">
  import type { LinkCardData } from "../../../../routes/links/+page.server";

  export let card: LinkCardData;

  import noimage from "../../../shared/assets/noimage.jpg";
</script>

<a
  target="_blank"
  href={card.link}
  class="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900
  md:h-[8rem] md:flex-row"
>
  {#await card.data}
    <div class="flex flex-col justify-between p-5 pr-12">
      <div class="">
        <h5
          class="truncate break-all text-lg font-semibold tracking-tight text-zinc-900 dark:text-white"
        >
          {"Untitled"}
        </h5>
        <p class="text-ellipsis py-2 text-sm text-zinc-400">
          {"No description"}
        </p>
      </div>
      <div class="truncate text-sm text-zinc-300">
        {card.link}
      </div>
    </div>
    <img
      class="max-h-[8rem] rounded-lg object-cover md:w-[16rem]"
      src={noimage}
      alt=""
    />
  {:then data}
    <div class="flex flex-col justify-between p-5 pr-12">
      <div class="">
        <h5
          class="truncate break-all text-lg font-semibold tracking-tight text-zinc-900 dark:text-white"
        >
          {data.ogTitle || "Untitled"}
        </h5>
        <p class="text-ellipsis py-2 text-sm text-zinc-400">
          {data.ogDescription || "No description"}
        </p>
      </div>
      <div class="truncate text-sm text-zinc-300">
        {card.link}
      </div>
    </div>
    <img
      class="max-h-[8rem] rounded-lg object-cover md:w-[16rem]"
      src={data.ogImage || noimage}
      alt=""
    />
  {/await}
</a>
