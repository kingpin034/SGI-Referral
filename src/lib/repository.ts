import type { AppData, Order, Profile, Repository } from './types';
import { createSandboxRepository } from './sandbox';

const configurationMessage = 'Layanan belum terhubung. Aktifkan sandbox dengan VITE_ENABLE_SANDBOX=true untuk uji coba akun dan transaksi.';

export class UnconfiguredRepository implements Repository {
  readonly mode = 'unconfigured' as const;
  private unavailable(): never { throw new Error(configurationMessage); }
  async load(): Promise<AppData> { return this.unavailable(); }
  async sendOtp(): Promise<void> { this.unavailable(); }
  async verifyAndSubmit(): Promise<Profile> { return this.unavailable(); }
  async signOut(): Promise<void> { this.unavailable(); }
  async updatePhone(): Promise<void> { this.unavailable(); }
  async createCheckout(): Promise<Order> { return this.unavailable(); }
  async confirmPayment(): Promise<Order> { return this.unavailable(); }
  async documentUrl(): Promise<string> { return this.unavailable(); }
}

export function resolveRepositoryMode(config: { enableSandbox?: string; dev: boolean }): Repository['mode'] {
  if (config.enableSandbox === 'true' || (config.dev && config.enableSandbox !== 'false')) return 'sandbox';
  return 'unconfigured';
}

const env = import.meta.env;
export const mode = resolveRepositoryMode({ enableSandbox: env.VITE_ENABLE_SANDBOX, dev: env.DEV });
export const repository: Repository = mode === 'sandbox'
  ? createSandboxRepository({ referralCode: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('ref') || undefined : undefined })
  : new UnconfiguredRepository();
