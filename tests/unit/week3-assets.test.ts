import { describe, expect, it } from 'vitest';
import manifest from '../../public/assets/tutorials/week3/asset-manifest.json';
import { courseDays } from '../../src/data/course';
import type { OneActionTutorialDay } from '../../src/data/course';
import { statSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Week 3 screenshot manifest', () => {
  it('registers each referenced screenshot once with verified, privacy-safe metadata', () => {
    expect(manifest.assets).toHaveLength(5);
    expect(new Set(manifest.assets.map((asset) => asset.deployPath)).size).toBe(5);
    for (const asset of manifest.assets) {
      expect(asset).toMatchObject({ captureDate: '2026-07-14', verifiedAt: '2026-07-16', status: 'verified', privacyReview: 'pass' });
      expect(asset.privacyNote).toBe('공식 문서/홍보용 예시 화면이며 계정·연락처·개인 식별정보 없음');
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.alt).not.toBe('');
      expect(statSync(resolve(process.cwd(), 'public', asset.deployPath.replace('/assets/', 'assets/'))).size).toBe(asset.bytes);
    }
    const week3Days = courseDays.filter((day): day is OneActionTutorialDay => day.week === 3 && day.experience === 'one-action');
    const referenced = week3Days.flatMap((day) => day.pages.flatMap((page) => [page.image, ...(page.images ?? [])].filter(Boolean).map((image) => ({ pageId: page.id, deployPath: image!.src })))).filter((image) => image.deployPath.includes('/week3/screenshots/'));
    expect(referenced).toHaveLength(5);
    expect(referenced.sort((left, right) => left.deployPath.localeCompare(right.deployPath))).toEqual(manifest.assets.map((asset) => ({ pageId: asset.pageId, deployPath: asset.deployPath })).sort((left, right) => left.deployPath.localeCompare(right.deployPath)));
  });
});
