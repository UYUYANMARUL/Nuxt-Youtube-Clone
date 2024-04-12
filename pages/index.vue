<template>
  <div>
    <VideoGrid></VideoGrid>
  </div>
  aasd
  <input v-model="inp" @input="test" />
</template>
<script setup>
const inp = ref("");

console.log(inp);

let variable = false;
async function test() {}
const { $test } = useNuxtApp();

const router = useRouter();

function run() {}
</script>
