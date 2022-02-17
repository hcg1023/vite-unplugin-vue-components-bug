import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
	AntDesignVueResolver,
	VantResolver,
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), AutoImport({
		imports: ['vue', 'vue-router'],
		resolvers: [AntDesignVueResolver(), VantResolver()],
		dts: 'src/auto-imports.d.ts',
	}),
		Components({
			resolvers: [AntDesignVueResolver(), VantResolver()],
			dts: 'src/components.d.ts',
		})],
	build: {
		target: 'es2015',
		lib: {
			entry: path.resolve(process.cwd(), `src/index.ts`),
			name: 'CustomControl',
			formats: ['umd'],
			fileName: 'CustomControl',
		},
		cssCodeSplit: true,
		rollupOptions: {
			external: [
				'vue',
				'ant-design-vue',
			],
			output: {
				globals: {
					vue: 'Vue',
					'ant-design-vue': 'antd',
				},
			},
		},
	}
})
