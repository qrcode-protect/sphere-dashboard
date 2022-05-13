'use strict';

/*
 * pntransfer-files-app
 *
 * (c) Sofiane Akbly <sakbly@pndata.tech>
 *
 * Created by WebStorm on 23/02/2022 at 15:14
 * File vendor/sofiakb/vue-element/utils/Modal
 */

import { each }  from "lodash";
import { clone } from "@app/vue/utils";

export class Modal {

	public open: boolean = false

	public name: string

	public props: any = {}

	public defaultProps: any = {}

	constructor(name: string, props: {}, open: boolean = false) {
		this.open = open
		this.name = name
		this.props = props
		this.defaultProps = clone(this.props)
	}

	show(values: any) {
		each(Object.keys(values), (key) => {
			if (this.props.hasOwnProperty(key))
				this.props[key] = values[key]
		})
		this.open = true
	}

	close() {
		this.open = false
		this.props = clone(this.defaultProps)
	}
}