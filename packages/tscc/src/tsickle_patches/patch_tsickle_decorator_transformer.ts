/**
 * @fileoverview This patches tsickle's decorator transformer exported from `decorator.ts` module
 * into a no-op transformer, see {@link https://github.com/angular/tsickle/issues/1164}. what
 * tsickle's transformer does is logical copy of what we have been doing, which chronologically
 * came later. In tscc, we in addition adds property access statements that is going to be removed
 * after closure compilation. Tsickle's transformation loses some information -- we need to know
 * what _decorate call is the ones we are concerned with, but for example, after tsickle's
 * transformation, one cannot distinguish [__tsickle_googReflect(...)]() { ... } with the one
 * generated by tsickle. Also, there are subtle differences concerning es3 output (which is ts's
 * default target).
 */

let original: typeof import('tsickle/src/decorators').transformDecoratorsOutputForClosurePropertyRenaming | undefined;

export function patchTsickleDecoratorTransformer() {
	if (!original) {
		const decorators: typeof import('tsickle/src/decorators') = require('tsickle/src/decorators');
		let original = decorators.transformDecoratorsOutputForClosurePropertyRenaming;
		decorators.transformDecoratorsOutputForClosurePropertyRenaming = () => {
			return (context) => (x => x);
		};
	}
}

export function restoreTsickleDecoratorTransformer() {
	if (original) {
		require('tsickle/src/decorators').transformDecoratorsOutputForClosurePropertyRenaming = original;
		original = undefined;
	}
}
