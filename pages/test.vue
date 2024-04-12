<template>
  <div></div>

    <input v-model="inp" />

  <input v-model="inp" />

  <button @click="hi">hi</button>
  <img
    src="https://picsum.photos/id/237/400/600"
    :style="{ viewTransitionName: 'test' }"
    @click="display('/')"
  />
</template>
<script setup>
function hi() {
  setTimeout(() => {
    console.log("hi");
  }, 3000);
}
//
const { $test } = useNuxtApp();

const inp = ref("");

const router = useRouter();

function display(path) {
  if (!document.startViewTransition) {
    router.push({ path });
  } else {
    document.startViewTransition(() => router.push({ path }));
  }
}
</script>
