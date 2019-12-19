<template>
  <div id="editor-setting">
    <h1>Editor Setting</h1>
    <b-form-group label="Line Numbers" label-for="lineNumbers">
      <b-form-select
        id="lineNumbers"
        v-model="option.lineNumbers"
        :options="activateOptions"
      />
    </b-form-group>
    <b-form-group label="Key Map" label-for="keyMap">
      <b-form-select
        id="keyMap"
        v-model="option.keyMap"
        :options="keyMapOptions"
      />
    </b-form-group>
    <b-form-group label="Theme" label-for="Theme">
      <b-form-select
        id="theme"
        v-model="option.theme"
        :options="themeOptions"
      />
    </b-form-group>
    <p>{{ option }}</p>
  </div>
</template>

<script>
import themeOptions from "./EditorSetting/themeOptions.js";
import keyMapOptions from "./EditorSetting/keyMapOptions.js";

export default {
  props: ["option"],
  data() {
    return {
      activateOptions: [
        {
          value: true,
          text: "active"
        },
        {
          value: false,
          text: "inactive"
        }
      ],
      keyMapOptions,
      themeOptions
    };
  }
};
</script>
