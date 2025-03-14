<script lang="ts">
  import { useRegisterSW } from "virtual:pwa-register/svelte";

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(
      serviceWorkerScriptUrl: string,
      registration?: ServiceWorkerRegistration
    ) {
      if (!registration) {
        console.error("[ServiceWorker]: Registration failed");
        return;
      }
      setInterval(
        async () => {
          if (registration.installing || !navigator) {
            return;
          }

          if ("connection" in navigator && !navigator.onLine) {
            return;
          }

          const response = await fetch(serviceWorkerScriptUrl, {
            cache: "no-store",
            headers: {
              cache: "no-store",
              "cache-control": "no-cache",
            },
          });

          if (response?.status === 200) {
            await registration.update();
          }
        },
        60 * 60 * 1000
      );
    },
    onRegisterError(err: unknown) {
      console.error("[ServiceWorker]: Registration error", err);
    },
  });
  const close = () => {
    offlineReady.set(false);
    needRefresh.set(false);
  };

  let toast = $derived($offlineReady || $needRefresh);
</script>

{#if toast}
  <div role="alert">
    <div>
      {#if $offlineReady}
        <span>App ready to work offline</span>
      {:else}
        <span>Une nouvelle version de l’application est disponible.</span>
      {/if}
    </div>
    {#if $needRefresh}
      <button onclick={() => updateServiceWorker(true)}>Installer</button>
    {/if}
    <button onclick={close}>Fermer</button>
  </div>
{/if}
