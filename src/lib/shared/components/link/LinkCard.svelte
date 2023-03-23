<script lang="ts">
  import type { LinkCardData } from "../../../../routes/links/+page.server";

  export let card: LinkCardData;
</script>

<a
  target="_blank"
  href={card.link}
  class="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800
  dark:border-gray-700"
>
  <img class="rounded-t-lg" src={card.og_image} alt="" />
  <div class="p-5">
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {card.og_title || "Untitled"}
    </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {card.og_description || "No description"}
    </p>
  </div>
</a>
