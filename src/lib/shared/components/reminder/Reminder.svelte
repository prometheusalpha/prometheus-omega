<script lang="ts">
  export let reminder: any;
  export let markAsDone: any;

  let formatDate = (date: Date) => {
    return date.toLocaleDateString("vn-VN");
  };
</script>

<div class="flex items-center pl-3">
  <input
    id="list-radio-license"
    type="radio"
    value=""
    on:click={() => markAsDone(reminder.id)}
    name="list-radio"
    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
  />
  <label
    for="list-radio-license"
    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    <div class="">
      {formatDate(reminder.deadline)}
    </div>
    {reminder.note}
  </label>
</div>
