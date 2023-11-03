<template>
  <PanelView>
    <template #panel-1> </template>
    <template #panel-2>
      <form class="contact" @submit.prevent="validateAndSubmit">
        <label for="input">Name</label>
        <input
          v-model="formValue.name"
          name="input"
          type="text"
          @input="() => (formValue?.response ? delete formValue.response : {})"
        />
        <label for="input">Email</label>
        <input
          v-model="formValue.email"
          name="input"
          type="email"
          @input="() => (formValue?.response ? delete formValue.response : {})"
        />
        <label for="input">Message</label>
        <textarea
          v-model="formValue.message"
          name="input"
          type="text"
          @input="() => (formValue?.response ? delete formValue.response : {})"
        />
        <button
          class="submit"
          type="submit"
          :disabled="!isValidEmail(formValue.email)"
          :style="{
            cursor: !isValidEmail(formValue.email) ? 'not-allowed' : 'pointer',
          }"
          @click="validateAndSubmit"
        >
          Submit
        </button>
      </form>
    </template>
    <template #panel-3>
      {{ formValue }}
    </template>
  </PanelView>
</template>

<script setup lang="ts">
import PanelView from "@/components/PanelView.vue";
import { ref, Ref } from "vue";
import { postContact, getContact } from "@/services/entites";

type FormValue = {
  name?: string;
  email?: string;
  message?: string;
  response?: string;
};

const formValue: Ref<FormValue> = ref({
  name: "",
  email: "",
  message: "",
});
const submitContact = async (value) => {
  try {
    await postContact({
      name: value.name,
      email: value.email,
      message: value.message,
    });
  } catch {
    console.log("error");
  } finally {
    console.log("done");
  }
};
const validateAndSubmit = () => {
  if (!isValidEmail(formValue.value.email)) {
    cantSave.value = true;
  } else {
    cantSave.value = false;
    submitContact(formValue.value);
    formValue.value = { response: "Thanks for contacting!" };
  }
};

function isValidEmail(email: string) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

const cantSave = ref(false);
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
  cursor: pointer;
  color: white;
}
</style>
