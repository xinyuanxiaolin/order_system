<template>
  <!-- 主体 -->
  <div class="container">
    <div style="display: flex">
      <img
        src="/images/logo.png"
        class="img-thumbnail"
        alt="..."
        style="width: 40%"
      />
      <div class="distance">
        <div class="card" style="width: 18rem; display: flex">
          <div class="card-body">
            <h5 class="card-title">馒头</h5>
            <p class="card-text">食品介绍</p>
            <p class="card-text">价格</p>
            <p class="card-text">促销</p>
            <p>
              数量：<button onclick="fun(-1)">-</button>
              <span>1</span>
              <button onclick="fun(1)">+</button>
            </p>

            <a href="#" class="btn btn-primary">加入收藏</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SHowDishDetail",
};
</script>

<style>
</style>