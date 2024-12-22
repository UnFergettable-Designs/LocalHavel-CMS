<script lang="ts">
  import { assetStore } from "../stores/zero-store";
  import type { Asset } from "../lib/zero";

  let newAsset = {
    name: "",
    type: "document",
    size: 0,
    metadata: {},
  };

  async function handleCreate() {
    await assetStore.create(newAsset);
    newAsset.name = ""; // Reset form
  }

  async function handleDelete(id: string) {
    await assetStore.delete(id);
  }
</script>

<div class="asset-list">
  <div class="asset-form">
    <input bind:value={newAsset.name} placeholder="Asset name" />
    <button on:click={handleCreate}>Create Asset</button>
  </div>

  {#each $assetStore as asset (asset.id)}
    <div class="asset-item">
      <span>{asset.name}</span>
      <span>{asset.type}</span>
      <button on:click={() => handleDelete(asset.id)}>Delete</button>
    </div>
  {/each}
</div>

<style>
  .asset-list {
    padding: 1rem;
  }

  .asset-form {
    margin-bottom: 1rem;
  }

  .asset-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }
</style>
