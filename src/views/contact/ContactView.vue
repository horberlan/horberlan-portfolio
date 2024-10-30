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
          @input="clearResponse"
        />
        <label for="input">Email</label>
        <input
          v-model="formValue.email"
          name="input"
          type="email"
          @input="clearResponse"
        />
        <label for="input">Message</label>
        <textarea
          v-model="formValue.message"
          name="input"
          type="text"
          @input="clearResponse"
        />
        <button
          class="submit"
          :class="{ canSave: isValidEmail(String(formValue.email)) }"
          type="submit"
          :disabled="!isValidEmail(String(formValue.email))"
          :style="{
            cursor: !isValidEmail(String(formValue.email))
              ? 'not-allowed'
              : 'pointer',
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
  <PopUp :showMessage="showPopUp" @update:showMessage="showPopUp = false" />
</template>

<script setup lang="ts">
import PanelView from "@/components/PanelView.vue";
import { ref, type Ref } from "vue";
import { postContact } from "@/services/entites";
import PopUp from "./PopUp.vue";

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
const showPopUp = ref(false);

const submitContact = async (value: FormValue) => {
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
    showPopUp.value = true;
  }
};
const validateAndSubmit = () => {
  if (!isValidEmail(String(formValue.value.email))) {
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
const clearResponse = () => {
  formValue.value?.response ? delete formValue.value.response : {};
};

const cantSave = ref(false);
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  gap: 1rem;
}
@media (max-width: 968px) {
  .contact {
    margin-top: 10dvh;
    height: 90dvh;
  }
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
  &.canSave {
    background: #5178a0;
  }
}
</style>
