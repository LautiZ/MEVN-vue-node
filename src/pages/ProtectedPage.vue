<template>
  <q-page padding>
    <h2>More information</h2>
    <div class="row flex-center" style="width: 90%; height: 50vh; margin: auto">
      <q-card
        class="my-card q-mx-md full-height"
        flat
        bordered
        style="width: 40%"
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Page based on this yt tutorial</div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              API REST: Node.js [Bluuweb]
            </div>
            <div class="text-caption text-grey">
              Creation of an Api rest with Node.js, Express, MongoDB and
              JWT(Refresh Token) so that users who register can enter their urls
              and shorten them for free.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="nodejs.png" />
          </q-card-section>
        </q-card-section>

        <div style="position: absolute; bottom: 0; width: 100%">
          <q-separator />

          <q-card-actions class="flex-center">
            <q-btn
              flat
              round
              icon="mdi-play-circle-outline"
              href="https://www.youtube.com/watch?v=VrLvbzHVT9A"
            />
            <q-btn
              flat
              round
              icon="mdi-code-tags"
              href="https://github.com/LautiZ/api-rest-mongo-express-node-jwt"
            />
          </q-card-actions>
        </div>
      </q-card>

      <q-card class="my-card full-height" flat bordered style="width: 40%">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Page based on this yt tutorial</div>
            <div class="text-h5 q-mt-sm q-mb-xs">MEVN (2022) [Bluuweb]</div>
            <div class="text-caption text-grey">
              Consumption of the api with axios and pinia. Project based on
              vuejs and quasar for the front end.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="logo-vuejs-min.png" />
          </q-card-section>
        </q-card-section>

        <div style="position: absolute; bottom: 0; width: 100%">
          <q-separator />

          <q-card-actions class="flex-center">
            <q-btn
              flat
              round
              icon="mdi-play-circle-outline"
              href="https://www.youtube.com/watch?v=53VBlv7K-BI&list=PLPl81lqbj-4Iy7yuRrVLn4V6isOVpvlpl&index=12"
            />
            <q-btn
              flat
              round
              icon="mdi-code-tags"
              href="https://github.com/LautiZ/MEVN-vue-node"
            />
          </q-card-actions>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
