<template>
  <PanelView>
    <template #panel-1> </template>
    <template #panel-2>
      <form @submit.prevent="submitContact(formValue)" class="contact">
        <label for="input">name</label>
        <input v-model="formValue.name" name="input" type="text" />
        <label for="input">email</label>
        <input v-model="formValue.email" name="input" type="email" />
        <label for="input">message</label>
        <textarea
          v-model="formValue.message"
          name="input"
          type="text"
        ></textarea>
        <button class="submit" type="submit">submit</button>
      </form>
    </template>
    <template #panel-3>
      {{ formValue }}
    </template>
  </PanelView>
</template>
<script setup lang="ts">
import PanelView from "@/components/PanelView.vue";
import { ref } from "vue";
import { postContact, getContact } from "@/services/entites";
const { data } = getContact();
const formValue = ref({
  name: "",
  email: "",
  message: "",
});
const submitContact = async (value) => {
  try {
    await postContact(value);
  } catch {
    console.log("error");
  } finally {
    console.log("done");
  }
};
</script>
<style lang="scss">
.contact {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  gap: 1rem;
}
input,
textarea {
  padding: 0.7rem 0rem;
  background: #011221;
  border: 1px solid $font-lynch;
  box-shadow: 0px 0px 0px 2px rgba(96, 123, 150, 0.3);
  border-radius: 8px;
  color: $white-full;
}
.submit {
  background: #1c2b3a;
  border-radius: 8px;
  border: none;
  padding: 14px 10px;
  max-width: 30%;
}
</style>
