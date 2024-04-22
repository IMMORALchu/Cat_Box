<style lang="scss"></style>
<template>
    <div>
        <h1>Schedule</h1>
        <Fullcalendar />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Fullcalendar from '@/components/Fullcalendar.vue';
@Options({
    components: {
        Fullcalendar
    },
})
export default class ScheduleView extends Vue {

    data() {
        return {
        };
    }
}
</script>
