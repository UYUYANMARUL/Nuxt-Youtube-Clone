<template>
  <div></div>

  <input v-model="inp" />

  <input v-model="inp" />
  <button @click="run">aaa</button>

  <button @click="run">aaa</button>

  <button @click="run">aaa</button>
  <img
    src="https://picsum.photos/id/237/400/600"
    :style="{ viewTransitionName: 'test' }"
    @click="display('/')"
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
</script>
