import React, { useState } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ChiSiamo = ({ show, handleShow, handleClose }) => {

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-6">

                    <div class="image-container d-block mx-auto chi-siamo-img" ></div>

                </div>
                <div class="col-12 col-md-6 chi-siamo-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem magna, consequat a dolor a, facilisis convallis libero. Quisque faucibus, nunc nec dignissim bibendum, purus lorem accumsan quam, fringilla hendrerit nisi est ut tortor. Pellentesque maximus est sit amet sem iaculis posuere. Aliquam consequat vehicula porta. Phasellus ipsum nibh, cursus ac vehicula nec, interdum sit amet magna. Etiam eget sodales massa, nec lacinia ligula. Aliquam erat volutpat. Sed auctor est eget commodo consequat. Mauris lacus magna, aliquam non odio eget, rutrum vehicula magna. Suspendisse ut dolor vitae odio efficitur pellentesque quis eget est. Duis id orci et justo hendrerit posuere a ut lectus. Vestibulum mollis blandit lorem at sagittis. Mauris rutrum blandit mi, vitae euismod sapien egestas a.

                    Ut venenatis faucibus justo sit amet rutrum. Nam turpis eros, ornare vel iaculis a, tincidunt in massa. Praesent vitae est eget mauris aliquam semper et at neque. Ut dictum augue nibh, ut blandit mi maximus eu. Nullam rhoncus condimentum rhoncus. Pellentesque ornare ipsum ante, sit amet porttitor dolor mattis a. Curabitur dui sem, iaculis id enim eget, consequat porta augue. Aenean laoreet vestibulum diam ut porttitor.

                    Mauris ac ultricies mi. Pellentesque semper eu nulla vel molestie. Donec nunc magna, pulvinar vitae luctus sed, tincidunt a velit. Duis laoreet placerat ligula efficitur gravida. Proin fringilla sed massa in sagittis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent nec enim posuere, tristique ipsum non, pharetra enim. Nunc consequat convallis elit nec imperdiet. Mauris ac tortor libero. Pellentesque quis dolor nec massa ullamcorper suscipit. Phasellus ac elit auctor, mollis metus elementum, suscipit nisl. Donec ultrices mattis bibendum. In nec risus sed purus malesuada dictum. Maecenas in sapien a massa pretium feugiat.
                </div>
            </div>
        </div>
    );
}
