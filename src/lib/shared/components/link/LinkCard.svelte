<script lang="ts">
  import type { LinkCardData } from "../../../../routes/links/+page.server";

  export let card: LinkCardData;

  import noimage from "../../../shared/assets/noimage.jpg";

  // calc number of char to truncate arcording to screen size
  const truncate = () => {
    const size = window.innerWidth;
    if (size < 640) return 30;
    if (size < 768) return 40;
    if (size < 1024) return 50;
    if (size < 1280) return 60;
    if (size < 1536) return 70;
    if (size < 1920) return 80;
    return 90;
  };

  let truncateLength = truncate();

  window.addEventListener("resize", () => {
    truncateLength = truncate();
  });
</script>

<a
  target="_blank"
  href={card.link}
  class="flex w-full flex-col justify-between rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900 md:h-32 md:flex-row"
>
  {#await card.data}
    <div class="flex flex-col justify-between p-5 pr-12">
      <div class="grow-0">
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
          {data.ogTitle?.length > truncateLength
            ? data.ogTitle.substring(0, truncateLength) + "..."
            : data.ogTitle || "Untitled"}
        </h5>
        <p class="text-ellipsis py-2 text-sm text-zinc-400">
          {data.ogDescription?.length > truncateLength
            ? data.ogDescription.substring(0, truncateLength) + "..."
            : data.ogDescription || "No description"}
        </p>
      </div>
      <div class="truncate text-sm text-zinc-300">
        {card.link?.length > truncateLength
          ? card.link.substring(0, truncateLength) + "..."
          : card.link || "No description"}
      </div>
    </div>
    <img
      class="max-h-[8rem] rounded-lg object-cover md:w-[16rem]"
      src={data.ogImage || noimage}
      alt=""
    />
  {/await}
</a>
