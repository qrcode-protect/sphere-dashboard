<template>
	<div class="ssf-input-container ssf-form-file">

		<slot v-if="hasSlot('label')" name="label"/>

		<ssf-input-label
				v-else-if="parent.label"
				:key="`text-label-${parent.label}`"
				:icon="icon"
				:label="parent.label"
				:placeholder="placeholder"
				@label-click="onLabelClick"/>


		<!-- TYPE : FILE -->
		<input :id="parent.name"
					 ref="inputComponent"
					 :accept="options.accepted"
					 :autocomplete="autocomplete"
					 :disabled="parent.disabled"
					 :name="parent.name"
					 :placeholder="placeholder"
					 :required="parent.required"
					 :type="parent.type"
					 class="ssf-form-control"
					 @change="onFileSelected"
					 @focusin="focused = true"
					 @focusout="focused = false"
					 @input="onInput()">


		<div :class="{'ssf-file-custom': hasSlot('selector'), 'ssf-form-control': !hasSlot('selector')}"
				 class="ssf-file-selector"
				 @click="onSelectorClick">

			<slot v-if="hasSlot('file-info')" name="file-info"/>

			<div v-else-if="file" class="file-info">
				{{ file.name }}&nbsp;<span class="file-size">({{ humanizeSize(file.size) }})</span>
			</div>

			<slot v-if="hasSlot('selector')" name="selector"/>

			<div v-else class="selector">
				<span>Choisir un fichier...</span>
			</div>

			<slot v-if="hasSlot('delete-file')" name="delete-file" @click.stop="onInput(true)"/>

			<div v-else class="delete-file" @click.stop="onInput(true)"></div>

		</div>

		<div v-if="preview" class="file-preview">
			<img v-if="url" :alt="url" :src="url"/>
		</div>


	</div>
</template>

<script>

	import SsfInputLabel from "../input-label";

	import { mimes }           from "../../utils/config/file";
	import { hasSlot }         from "@sofiakb/vue-element/utils";
	import { defineComponent } from "vue";
	import { keys }            from "lodash";

	const config = { mimes }

	export default defineComponent({
		name: "ssf-input-file",

		emits: [ 'focus', 'change', 'input', 'error' ],

		components: { SsfInputLabel },

		props: {
			mimes       : {
				type     : String,
				required : false,
				default  : 'pdf, csv, text, gif, jpeg, png, icon',
				validator: (mime) => typeof mime === 'undefined' || mime === '*' || mime.trim() === '' || keys(mimes).includes(mime)
			},
			fileAccepted: { type: String, required: false, default: '*' },
			preview     : { type: Boolean, required: false, default: false },
			showError   : { type: Boolean, required: false, default: false },
		},

		data() {
			return {
				focused: false,
				file   : null,
				options: {
					mimes   : null,
					accepted: null,
				},
				url    : null
			}
		},

		created() {
			this.initMimes()
		},

		watch: {
			mimes() {
				this.initMimes()
			},

			fileAccepted: {
				immediate: true,
				handler() {
					this.initFileAccepted()
				}
			},

		},

		computed: {

			icon() {
				return this.parent.$data.options.icon
			},

			parent() {
				return this.$parent
			},

			placeholder() {
				let placeholder = this.parent.placeholder, label = this.parent.label;
				return (placeholder === true) ? label : (typeof placeholder).toLowerCase() === 'string' ? placeholder : ''
			},

			autocomplete() {
				let autocomplete = this.parent.autocomplete;
				return `${autocomplete ? autocomplete === true ? this.parent.name : autocomplete : ''}`
			},

			hasSlots() {
				return this.hasSlot('selector') && this.hasSlot('file-info') && this.hasSlot('delete-file')
			}
		},

		methods: {

			hasSlot(name) {
				return hasSlot(this, name)
			},

			initMimes() {
				let mimes = this.mimes.split(', ');
				this.options.mimes = {};
				mimes.forEach((mime) => this.options.mimes[mime] = config.mimes[mime] || null)
			},

			initFileAccepted() {
				this.initMimes()
				let accepted = this.fileAccepted.split(', '), result = Object.values(this.options.mimes);
				this.options.accepted = '';
				accepted.forEach((mime) => result.push(mime))
				this.options.accepted = result.join(',')
			},

			checkMimeType(mime) {
				return mime && this.options.mimes
							 ? Object.keys(this.options.mimes).find(key => Array.isArray(this.options.mimes[key]) ? this.options.mimes[key].includes(mime) : this.options.mimes[key] === mime)
								 ? true
								 : this.showError ? alert('Merci de choisir un fichier valide') /*this.showErrorMessage('mime')*/ : false
							 : false
			},

			checkFile(file) {
				return file === null ? false : this.checkMimeType(file.type)
			},

			humanizeSize(size) {
				if (size / 1000 < 1000)
					return Number((size / 1000).toFixed(1)) + ' Ko';
				if (size / 1000 / 1000 < 1000)
					return Number((size / 1000 / 1000).toFixed(1)) + ' Mo';
				return Number((size / 1000 / 1000 / 1000).toFixed(1)) + ' Go'
			},

			onLabelClick() {
				this.$nextTick(() => {
					this.focused = true;
					this.$refs.inputComponent.focus();
					this.$forceUpdate()
				})
			},

			onSelectorClick() {
				this.$nextTick(() => {
					return this.$refs.inputComponent.click()
				})
			},

			onFileSelected($event) {
				let event = $event || window.event, target = event.target || event.dataTransfer,
						file = target.files[0] || null;
				this.url = URL.createObjectURL(file);
				return this.checkFile(file) ? (this.file = file, this.onInput()) : this.$emit("error")
			},

			onInput(deleteFile = false) {
				if (!!deleteFile) {
					this.file = null
					this.url = null
					this.$forceUpdate()
					return this.$emit('input', this.file)
				} else
					return this.$emit('input', this.file ? {
						name     : this.file.name,
						size     : this.file.size,
						humanSize: this.humanizeSize(this.file.size),
						type     : this.file.type,
						data     : this.file
					} : this.file)
			},

		}
	})
</script>

<style lang="scss" scoped>
	.ssf-form-file {
		input[type=file].ssf-form-control {
			display: none;
		}

		.file-preview {
			padding-top: 15px;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				max-width: 100%;
				max-height: 200px;
			}
		}

		.ssf-form-control.ssf-file-selector:not(.ssf-file-custom) {
			position: relative;
			cursor: pointer;

			.file-info {
				.file-size {
					font-size: small;
					font-style: italic;
					color: #dddddd;
				}
			}

			.selector, .delete-file {
				position: absolute;
				top: 0;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: auto;
				margin-bottom: auto;
			}

			.selector {
				right: 0;
				width: 150px;
				color: #FFFFFF;
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
				background: #0f0f0f;
				font-style: italic;
			}

			.delete-file {
				right: 155px;
				width: 20px;
				height: 20px;

				&:before,
				&:after {
					content: '';
					position: absolute;
					height: 10px;
					width: 2px;
					background: #0f0f0f;
				}

				&:before {
					transform: rotate(45deg);
				}

				&:after {
					transform: rotate(-45deg);
				}

				&:hover {
					&:before, &:after {
						background: #d6534c;
					}
				}

			}
		}

	}
</style>
