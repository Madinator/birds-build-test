<template>
  <div id="app">
    <NuxtLayout name="header">
        <NuxtPage  />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
#app {
    margin: 0 auto 100px;
    width: 100%;
    max-width: 1920px;
    
    @media only screen and (max-width: 1920px) {
        width: 65%;
    }

    @media only screen and (max-width: 850px) {
        width: 70%;
    }
  
    @media only screen and (max-width: 750px) {
        width: 75%;
    }
  
    @media only screen and (max-width: 600px) {
        width: 90%;
    }
  
    @media only screen and (max-width: 450px) {
        width: 92%;
    }
}

.button {
    border-radius: 10px;
    padding: 17.5px 35.5px;
    &:hover {
        filter: brightness(80%);
    }
}

.button-base {
    background: #F4F5F9;
    color: var(--color-primary);
    width: 100%;
}

.button-secondary {
    background: #69C57F;
    color: white;
    width: 100%;
}
.button-secondary[disabled] {
    border: 1px solid #E0E3EE;
    color: var(--color-secondary);
    background: white;
    &:hover {
        filter: brightness(100%);
    }
}
</style>