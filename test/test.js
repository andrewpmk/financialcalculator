import { assert } from "chai";
import { calculatefederaltax, calculateontariotax, calculateontariohealthpremium } from "../src/incometax";
import { calculateinterest } from "../src/interest";

describe('Tax', function() {
    it('Federal Tax Calculations', function() {
        assert.strictEqual(calculatefederaltax(0).toFixed(2), "0.00");
        assert.strictEqual(calculatefederaltax(48535).toFixed(2), "7280.25");
        assert.strictEqual(calculatefederaltax(97069).toFixed(2), "17229.72");
        assert.strictEqual(calculatefederaltax(150473).toFixed(2), "31114.76");
        assert.strictEqual(calculatefederaltax(214368).toFixed(2), "49644.31");
    });
    it('Ontario Tax Calculations', function() {
        assert.strictEqual(calculateontariotax(0).toFixed(2), "0.00");
        assert.strictEqual(calculateontariotax(44740).toFixed(2), "2259.37");
        assert.strictEqual(calculateontariotax(89482).toFixed(2), "6352.89");
        assert.strictEqual(calculateontariotax(150000).toFixed(2), "13106.81");
        assert.strictEqual(calculateontariotax(220000).toFixed(2), "21619.00");
    });
    it('Ontario Health Premium Calculations', function() {
        assert.strictEqual(calculateontariohealthpremium(20000).toFixed(2), "0.00");
        assert.strictEqual(calculateontariohealthpremium(25000).toFixed(2), "300.00");
        assert.strictEqual(calculateontariohealthpremium(36000).toFixed(2), "300.00");
        assert.strictEqual(calculateontariohealthpremium(38500).toFixed(2), "450.00");
        assert.strictEqual(calculateontariohealthpremium(48000).toFixed(2), "450.00");
        assert.strictEqual(calculateontariohealthpremium(48600).toFixed(2), "600.00");
        assert.strictEqual(calculateontariohealthpremium(72000).toFixed(2), "600.00");
        assert.strictEqual(calculateontariohealthpremium(72600).toFixed(2), "750.00");
        assert.strictEqual(calculateontariohealthpremium(200000).toFixed(2), "750.00");
        assert.strictEqual(calculateontariohealthpremium(200600).toFixed(2), "900.00");
    });
});
describe('Interest', function() {
    it('Calculate interest rates', function() {
        assert.approximately(calculateinterest(100000, 5, 0.05), 100000 * 1.05 ** 5, 0.01);
    });
});