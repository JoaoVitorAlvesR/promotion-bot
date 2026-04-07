// matchFilter.test.ts
import { describe, it, expect } from "vitest";
import { matchFilter } from "./match-filter";

describe("matchFilter", () => {
  // ── TV ─────────────────────────────────────────────────────────────────────
  describe("TV", () => {
    it("retorna match com todos os termos e preço válido", () => {
      const result = matchFilter("tv samsung 55 neo qled R$ 4.999,00");
      expect(result).not.toBeNull();
      expect(result?.filter.name).toBe("TV");
      expect(result?.price).toBe(4999);
    });

    it("retorna null quando falta um required (ex: neo)", () => {
      const result = matchFilter("tv samsung 55 qled R$ 2.000,00");
      expect(result).toBeNull();
    });

    it("retorna null quando preço acima de 5000", () => {
      const result = matchFilter("tv samsung 55 neo qled R$ 5.001,00");
      expect(result).toBeNull();
    });

    it("aceita preço exatamente no limite (5000)", () => {
      const result = matchFilter("tv samsung 55 neo qled R$ 5.000,00");
      expect(result?.price).toBe(5000);
    });

    it("retorna null sem preço", () => {
      const result = matchFilter("tv samsung 55 neo qled ótima oferta");
      expect(result).toBeNull();
    });
  });

  // ── Notebook ASUS ──────────────────────────────────────────────────────────
  describe("Notebook ASUS", () => {
    it("match com asus", () => {
      const result = matchFilter("notebook asus core i5 R$ 2.500,00");
      expect(result?.filter.name).toBe("Notebook ASUS");
      expect(result?.price).toBe(2500);
    });

    it("match com acer", () => {
      const result = matchFilter("notebook acer aspire R$ 1.800,00");
      expect(result?.filter.name).toBe("Notebook ASUS");
    });

    it("match com dell", () => {
      const result = matchFilter("notebook dell inspiron R$ 2.999,00");
      expect(result?.filter.name).toBe("Notebook ASUS");
    });

    it("retorna null sem nenhuma marca do oneOf", () => {
      const result = matchFilter("notebook lenovo R$ 1.500,00");
      expect(result).toBeNull();
    });

    it("retorna null acima de 3000", () => {
      const result = matchFilter("notebook asus R$ 3.001,00");
      expect(result).toBeNull();
    });
  });

  // ── Cooktop ────────────────────────────────────────────────────────────────
  describe("Cooktop", () => {
    it("match com fischer", () => {
      const result = matchFilter("cooktop fischer 4 bocas R$ 800,00");
      expect(result?.filter.name).toBe("Cooktop");
      expect(result?.price).toBe(800);
    });

    it("match com brastemp", () => {
      const result = matchFilter("cooktop brastemp 5 bocas R$ 1.200,00");
      expect(result?.filter.name).toBe("Cooktop");
    });

    it("match com electrolux", () => {
      const result = matchFilter("cooktop electrolux R$ 999,00");
      expect(result?.filter.name).toBe("Cooktop");
    });

    it("retorna null sem marca reconhecida", () => {
      const result = matchFilter("cooktop consul R$ 700,00");
      expect(result).toBeNull();
    });

    it("retorna null acima de 1500", () => {
      const result = matchFilter("cooktop fischer R$ 1.501,00");
      expect(result).toBeNull();
    });
  });

  // ── PS5 (teste) ────────────────────────────────────────────────────────────
  describe("PS5", () => {
    it("match simples com ps5 e preço válido", () => {
      const result = matchFilter("ps5 mídia física R$ 3.500,00");
      expect(result?.filter.name).toBe("teste");
      expect(result?.price).toBe(3500);
    });

    it("retorna null acima de 5000", () => {
      const result = matchFilter("ps5 R$ 5.500,00");
      expect(result).toBeNull();
    });
  });

  // ── Parse de preço ─────────────────────────────────────────────────────────
  describe("parse de preço", () => {
    it("interpreta ponto como separador de milhar", () => {
      const result = matchFilter("Ps5 R$ 1.000,00");
      expect(result?.price).toBe(1000);
    });

    it("interpreta valor sem centavos (ex: R$ 500)", () => {
      const result = matchFilter("ps5 R$ 500");
      expect(result?.price).toBe(500);
    });

    it("retorna null se não houver R$", () => {
      const result = matchFilter("ps5 por apenas 3500 reais");
      expect(result).toBeNull();
    });
  });
});
