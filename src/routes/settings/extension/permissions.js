import React from 'react'
import t from '~t'
import browser from '~target/extension/browser'

import { Label, Checkbox, SubLabel } from '~co/common/form'
import { Error } from '~co/overlay/dialog'

export default class SettingsExtensionPermissions extends React.Component {
    state = {
        permissions: [
            {
                id: 'tabs',
                enabled: false,
                title: `${t.s('access')} ${t.s('all').toLowerCase()} ${t.s('tabs').toLowerCase()}`,
                excerpt: 'Saved pages will be marked with [✓] icon'
            }
        ]
    }

    async componentDidMount() {
        await this.reload()
    }

    async reload() {
        const permissions = [...this.state.permissions]

        for(const index in permissions)
            permissions[index].enabled = await browser.permissions.contains({
                permissions: [permissions[index].id]
            })

        this.setState({ permissions })
    }

    onChangePermission = (e)=>{
        const index = parseInt(e.target.getAttribute('data-index'))
        const { id, enabled } = this.state.permissions[index]

        browser.permissions[enabled?'remove':'request']({
            permissions: [id]
        })
            .then(()=>this.reload())
            .catch(Error)
    }

    renderPermission = ({ id, title, excerpt, enabled }, index)=>(
        <React.Fragment key={id}>
            <Checkbox 
                data-index={index}
                checked={enabled}
                onChange={this.onChangePermission}>
                {title}
            </Checkbox>

            {excerpt && (<SubLabel>{excerpt}</SubLabel>)}
        </React.Fragment>
    )

    render() {
        return (
            <>
                <Label>
                    {t.s('permissions')}
                </Label>
                <div>
                    {this.state.permissions.map(this.renderPermission)}
                </div>
            </>
        )
    }
}