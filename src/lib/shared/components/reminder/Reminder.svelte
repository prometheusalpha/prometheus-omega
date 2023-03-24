<script lang="ts">
  export let reminder: {
    id: string;
    note: string;
    deadline: Date;
  };
  export let markAsDone: any;

  let formatDate = (date: Date) => {
    let d = new Date(date);
    return `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;
  };
</script>

<input
  id="list-radio-license-${reminder.id}"
  type="radio"
  value=""
  on:click={() => markAsDone(reminder.id)}
  name="list-radio"
  class="hidden"
/>
<div
  class="flex items-center pl-3 hover:bg-zinc-800 rounded-xl cursor-pointer group"
>
  <div
    class="rounded-full w-6 h-6 border border-zinc-600 group-hover:bg-zinc-700"
  />
  <label
    for="list-radio-license-${reminder.id}"
    class="w-full py-3 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300"
  >
    <p class="text-lg">
      {reminder.note}
    </p>
    <div class="text-zinc-500">
      {formatDate(reminder.deadline)}
    </div>
  </label>
</div>
