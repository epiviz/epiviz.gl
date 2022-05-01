import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import json from '@rollup/plugin-json';
import OMT from "@surma/rollup-plugin-off-main-thread";
import dsv from '@rollup/plugin-dsv';

export default [
	{
		input: 'app/scripts/index.js',
		output: {
			file: 'app/bundle.js',
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			sourcemap: true
		},
		plugins: [
			OMT(), resolve({ preferBuiltins: false }), commonjs(), json(),
			dsv()
		]
	}
];