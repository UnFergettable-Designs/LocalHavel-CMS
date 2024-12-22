<script lang="ts">
  import { auth } from "../stores/auth";
  import type { LoginCredentials } from "../lib/auth/types";

  let credentials: LoginCredentials = {
    email: "",
    password: "",
  };
  let error: string | null = null;
  let loading = false;

  async function handleSubmit() {
    error = null;
    loading = true;

    try {
      await auth.login(credentials);
      // Redirect to dashboard or home page
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="login-form">
  <h2>Login</h2>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="field">
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      bind:value={credentials.email}
      required
      disabled={loading}
    />
  </div>

  <div class="field">
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      bind:value={credentials.password}
      required
      disabled={loading}
    />
  </div>

  <button type="submit" disabled={loading}>
    {loading ? "Logging in..." : "Login"}
  </button>
</form>

<style>
  .login-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .field {
    margin-bottom: 1rem;
  }

  .error {
    color: red;
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background: #ccc;
  }
</style>
