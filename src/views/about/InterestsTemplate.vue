<script lang="ts">
import { h } from "vue";

export default {
  props: {
    msg: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    return () => h("p", props.msg);
  },
};
</script>

<style lang="scss" scoped></style>
