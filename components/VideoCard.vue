<template>
  <div class="flex flex-col gap-2">
    <a :href="`/watch?v=${props.id}`" class="relative aspect-video">
      <img
        :src="props.thumbnailUrl"
        :class="`block w-full h-full object-cover transition-[border-radius] duration-200 ${
          props.isVideoPlaying ? 'rounded-none' : 'rounded-xl'
        }`"
      />
      <div
        className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded"
      >
        {{ $formatDuration(props.duration) }}
      </div>
      <video
        :class="`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
          props.isVideoPlaying ? 'opacity-100 delay-200' : 'opacity-0'
        }`"
        :ref="props.videoRef"
        muted
        playsInline
        :src="props.videoUrl"
      />
    </a>
    <div className="flex gap-2">
      <a :href="`/@${props.channel.id}`" class="flex-shrink-0">
        <img class="w-12 h-12 rounded-full" :src="props.channel.profileUrl" />
      </a>
      <div class="flex flex-col">
        <a class="font-bold">{{ props.title }}</a>
        <a
          :href="`/@${props.channel.id}`"
          className="text-secondary-text text-sm"
        >
        </a>
        <div class="text-secondary-text text-sm">
          {{ VIEW_FORMATTER.format(props.views) }} Views •
          {{ $formatTimeAgo(props.postedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});
const { $formatDuration, $formatTimeAgo } = useNuxtApp();

const props = defineProps({
  id: { type: String, required: true },
  title: { String, required: true },
  channel: { Object, required: true },
  views: { Number, required: true },
  postedAt: { Date, required: true },
  duration: { Number, required: true },
  thumbnailUrl: { String, required: true },
  videoUrl: { String, required: true },
});

console.log(props);
/*
  id: string
  title: string
  channel: {
    id: string
    name: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string

*/

function run() {}
</script>
