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

<div
  class="group flex cursor-pointer items-center rounded-xl pl-3 hover:bg-zinc-800"
  on:click={() => markAsDone(reminder.id)}
  on:keydown={() => markAsDone(reminder.id)}
>
  <div
    class="h-6 w-6 rounded-full border border-zinc-600 group-hover:bg-zinc-900"
  />
  <div
    class="ml-2 w-full cursor-pointer py-3 text-sm font-medium text-zinc-900 dark:text-zinc-300"
  >
    <p class="text-lg">
      {reminder.note}
    </p>
    <div class="text-zinc-500">
      {formatDate(reminder.deadline)}
    </div>
  </div>
</div>
