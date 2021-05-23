<template>
  <section class="index-module_grid">
    <b-row class="index-module_row row">

      <b-col cols="3" class="index-module_col">
        <div class="index-module_info">
          <div class="index-module_info__icon module_info--yellow">
            <fa-icon icon="user-friends"/>
          </div>
          <div class="index-module_info__content">
            <div class="module_info__text">CUSTOMERS</div>
            <div class="module_info__number">
              <span class="value">5</span>
              <a href="" class="view" v-b-tooltip.hover.left title="Detail">
                <fa-icon icon="caret-right" />
              </a>
            </div>
            <b-progress max="100">
              <b-progress-bar class="module_info--yellow" value="50" label="50%"></b-progress-bar>
            </b-progress>
            <div class="module_info__process--desc">
              <fa-icon icon="plus" />
              <span>2 Customers in 30 days</span>
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="3" class="index-module_col">
        <div class="index-module_info">
          <div class="index-module_info__icon module_info--aqua">
            <fa-icon icon="user-tag"/>
          </div>
          <div class="index-module_info__content">
            <div class="module_info__text">MERCHANTS</div>
            <div class="module_info__number">
              <span class="value">5</span>
              <a href="" class="view" v-b-tooltip.hover.left title="Detail">
                <fa-icon icon="caret-right" />
              </a>
            </div>
            <b-progress max="100">
              <b-progress-bar class="module_info--aqua" value="50" label="50%"></b-progress-bar>
            </b-progress>
            <div class="module_info__process--desc">
              <fa-icon icon="plus" />
              <span>3 Merchants in 30 days</span>
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="3" class="index-module_col">
        <div class="index-module_info">
          <div class="index-module_info__icon module_info--green">
            <fa-icon icon="shopping-cart"/>
          </div>
          <div class="index-module_info__content">
            <div class="module_info__text">TODAY'S TOTAL</div>
            <div class="module_info__number">
              <span class="value">$2,070</span>
              <a href="" class="view" v-b-tooltip.hover.left title="Detail">
                <fa-icon icon="caret-right" />
              </a>
            </div>
            <b-progress max="100">
              <b-progress-bar class="module_info--green" value="50" label="50%"></b-progress-bar>
            </b-progress>
            <div class="module_info__process--desc">
              <fa-icon icon="arrow-up" />
              <span>100% up from yesterday</span>
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="3" class="index-module_col">
        <div class="index-module_info">
          <div class="index-module_info__icon module_info--red">
            <fa-icon icon="heart"/>
          </div>
          <div class="index-module_info__content">
            <div class="module_info__text">VISITORS TODAY</div>
            <div class="module_info__number">
              <span class="value">5</span>
              <a href="" class="view" v-b-tooltip.hover.left title="Detail">
                <fa-icon icon="caret-right" />
              </a>
            </div>
            <b-progress max="100">
              <b-progress-bar class="module_info--red" value="50" label="50%"></b-progress-bar>
            </b-progress>
            <div class="module_info__process--desc">
              <fa-icon icon="arrow-up" />
              <span>100% Increase in 30 days</span>
            </div>
          </div>
        </div>
      </b-col>

    </b-row>
  </section>
</template>

<script>
export default {
  name: 'panel-group'
}
</script>