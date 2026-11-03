// SVGO config for the potion symbols.
//
// Inkscape writes masks as <mask maskUnits="userSpaceOnUse"> with no
// x/y/width/height. Browsers then default the mask region to -10%..120% of
// the *viewport*, which clips away content drawn at large local coordinates
// (e.g. the balls in "extract of shuffling fortune"). Inkscape ignores the
// mask region, so the file looks fine there but not in Chrome/rsvg.
// Dropping maskUnits makes the region default to the masked element's
// bounding box, which is what we want.

const stripInkscapeMaskUnits = {
  name: 'stripInkscapeMaskUnits',
  fn: () => ({
    element: {
      enter(node) {
        if (node.name !== 'mask') return;
        const a = node.attributes;
        if (a.maskUnits !== 'userSpaceOnUse') return;
        // Only strip when the region isn't set explicitly in user space.
        if ('x' in a || 'y' in a || 'width' in a || 'height' in a) return;
        delete a.maskUnits;
      },
    },
  }),
};

export default {
  multipass: true,
  plugins: ['preset-default', stripInkscapeMaskUnits],
};
