<template>
  <div></div>
  <input v-model="inp" />
  <button @click="run">aaa</button>
  <img
    src="https://picsum.photos/id/237/200/300"
    @click="display('/test')"
    :style="{ viewTransitionName: 'test' }"
  />
</template>
<script setup>
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

function run() {}
</script>
