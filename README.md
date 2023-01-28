# ŞubadApp

[![Play Store](https://img.shields.io/endpoint?color=32ca55&logo=google-play&logoColor=32ca55&url=https%3A%2F%2Fplay.cuzi.workers.dev%2Fplay%3Fi%3Dorg.subadapp%26l%3D%24name%26m%3D%24updated)](https://play.google.com/store/apps/details?id=org.subadapp)
[![Latest](https://img.shields.io/github/release/subadapcocuk/subadapp?labelColor=3b444c&logoColor=white&color=32ca55)](https://github.com/subadapcocuk/subadapp/releases/latest)
[![Licensed by Apache](https://img.shields.io/github/license/subadapcocuk/subadapp?labelColor=3b444c&logoColor=white&color=32ca55)](https://github.com/subadapcocuk/subadapp/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/subadapcocuk/subadapp?labelColor=3b444c&logoColor=white&color=32ca55)](https://github.com/subadapcocuk/subadapp/issues)
[![Release](https://github.com/subadapcocuk/subadapp/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/subadapcocuk/subadapp/actions/workflows/main.yml)
[![CodeQL](https://github.com/subadapcocuk/subadapp/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/subadapcocuk/subadapp/actions/workflows/codeql-analysis.yml)

[ŞubadApp](https://github.com/subadapcocuk/subadapp),
[Şubadap Çocuk](https://github.com/subadapcocuk) tarafından
[Özgür Yazılım](https://www.gnu.org/philosophy/free-sw.tr.html) olarak
geliştirilen ve
[Apache Lisansı 2.0](https://github.com/subadapcocuk/subadapp/blob/main/LICENSE)
kapsamında yayınlanan bir uygulamadır.

## Sürümler ve değişiklikler

Sürümler ve değişiklikler için [değişiklik günlüğüne](./CHANGELOG.md)
bakabilirsiniz.

## Hata bildirimi

Bu uygulama tamamen özgür yazılım olarak gönüllü bir şekilde geliştirilmektedir.
Dolayısıyla indirip kullanmanız durumunda hata içerebileceğini ve kullanmanın
tamamen sizin sorumluluğunuzda olduğunu kabul etmeniz gerekiyor.

- Hata bildirimlerini şu bağlantıdan yapabilirsiniz:
  <https://github.com/subadapcocuk/subadapp/issues>
- Mevcut geliştirme ve sonraki sürüm hedeflerini projeler sayfasında
  görebilirsiniz: <https://github.com/subadapcocuk/subadapp/projects/>
- Fikirleriniz, sorularınız, genel düşünceleriniz varsa tartışma kısmına
  bakabilirsiniz: <https://github.com/subadapcocuk/subadapp/discussions>

## Geliştirme

[Expo](https://expo.dev/) kullanılarak geliştirilen bir
[React Native](https://reactnative.dev/) uygulamasıdır.

Geliştirme ortamı olarak [Expo](https://expo.dev/)'yu kurmak için
[Introduction to Expo](https://docs.expo.dev/) sayfasına bakılabilir.
Paket yöneticisi olarak da [yarn](https://yarnpkg.com/) tercih edilmiştir.
Bu uygulamaları aşağıdaki gibi kurabilirsiniz:

- [node](https://nodejs.org/en/download/) (kurmak için
  [NVM](https://github.com/nvm-sh/nvm) de kullanabilirsiniz)
- [yarn](https://classic.yarnpkg.com/): `npm install --global yarn`.
- [expo-cli](https://docs.expo.dev/workflow/expo-cli/):
  `npm install -g expo-cli` (bu aracı kurmanız zorunlu değil)

Ortam hazır olduktan sonra aşağıdaki betikleri projenin olduğu dizinde
kullanabilirsiniz:

- `yarn install`: Gerekli paketleri kurar, sadece `yarn` olarak da
  kullanabilirsiniz.
- `yarn add <paket adı>`: Yeni bir paket/kütüphane eklemek için, belli bir
  pakete ihtiyacınız varsa <https://www.npmjs.com/> sayfasında arayabilirsiniz.
- `yarn start`: Expo sunucusunu başlatır.
- `yarn android`: Android emülatörünü başlatır, bunu ayrı bir terminalde
  başlatmanız gerekiyor.
- `yarn ios`: IOS emülatörünü başlatır, bunu ayrı bir terminalde
  başlatmanız gerekiyor.
- `yarn web`: Tarayıcıda görüntülemek için.
- `yarn build:android`: Android paketi oluşturur. APK dosyasını yerelde
  kaydetmesi için `--local` argümanıyla çalıştırın.
- `yarn build:ios`: IOS paket oluşturur.
- `yarn build:all`: Tüm paketleri oluşturur.

Tüm
[albümler](<[./data/albums.json](https://ansiklopedi.subadapcocuk.org/albums.json)>)
ve
[şarkılar](<[./data/songs.json](https://ansiklopedi.subadapcocuk.org/songs.json)>)
JSON olarak saklanıyor. Kolayca güncelleme ve JSON dosyalarını oluşturmak için
[data/songs.xlsx](./data/songs.xlsx) dosyasından yararlanılabilir.

### Kullanılan Önemli Kütüphaneler

- [FontAwesome](https://github.com/FortAwesome/react-native-fontawesome)
  tarafından sunulan ücretsiz simgeler kullanılıyor
- [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/) ortam dosyaları için
  kullanılıyor

## Yayınlama ve test etme

Ana (`main`) dala gönderilen/itilen kod olması durumunda
[`publish` görevi](.github/workflows/main.yml#L34) elle başlatılabiliyor ve
Expo'ya [denenmeye hazır son sürümü](https://expo.io/@subadapcocuk/subadapp) itiyor.
Bu yayınlama görevi Expo tarafından sunulan
[örnek akışlardan](https://github.com/expo/expo-github-action#example-workflows)
yararlanılarak eklendi. APK dosyası da
[`build-android` göreviyle](.github/workflows/main.yml#L8) otomatik olarak
oluşturulup bir sürüm yayınlanıyor.

Sürüm yükseltmeden önce lisans listesini gözden geçirebilirsiniz:

```bash
yarn license
```

Daha sonra sürümü değiştirin:

```bash
yarn release <patch, minor, major>
git push --follow-tags origin main
```

Yerelde test etmek için şu komutlar kullanılabilir:

```bash
yarn
yarn start
```

⚠️ Bu komutların çalışması için yukarıda bağlantıları verilen `node`, `yarn` ve
`expo-cli` araçlarının kurulu olması gerekiyor.

Komut satırındaki yönergelere uyulabilir veya açılacak pencereden telefonda
karekod okutularak uygulama denenebilir.

## Şubadap Çocuk

[Şubadap Çocuk](https://subadapcocuk.org), çocuk şarkıları yapan bir müzik
grubudur. 2013 yılında İzmir'de kurulmuştur. Çocukların, kendi hayatlarına
değen, onların karşılaştıkları durumları/çelişkileri konu alan ve içinde
yaşadıkları dünyaya dair kendi sözlerini söylemesini hedefleyen tematik şarkılar
yapmaktadır. Bugüne kadar yayınlanmış 6 albümü ve toplam 40 şarkısı
bulunmaktadır. Yalnızca kendi şarkılarını seslendirdiği çocuk şarkıları
konserleriyle Türkiye, Kıbrıs, Almanya ve Hollanda'nın çeşitli yerlerinde bugüne
dek 500'ün üzerinde yerde çocuklarla buluşmuştur. Konserleri yalnızca kentlerde
değil, Türkiye'nin birçok bölgesindeki köy okullarında, mahallelerde, parklarda
da vermiştir. Sahnede genellikle davul (bateri), bas gitar, gitar, flüt, keman,
akordiyon, trompet ve mandolin çalgılarıyla yer almaktadır.

Uygulamada kullanılan ve bağlantı verilen tüm şarkılar, resimler, sayfalar,
kitaplar, vb.
[Şubadap Çocuk Ansiklopedisi](https://ansiklopedi.subadapcocuk.org/index.php/%C5%9Eubadap_%C3%87ocuk_Ansiklopedisi)ndedir.
[Şubadap Çocuk](https://subadapcocuk.org) yaptığı tüm üretimleri
[Copyleft](https://ansiklopedi.subadapcocuk.org/index.php/Copyleft) kapsamında
yayınlamaktadır. Şarkılar doğrudan uygulamada yer almıyor, İnternet üzerinden
akış şeklinde çalıyor. Dolayısıyla uygulamayı kullanabilmek için İnternet
bağlantısı gerekmektedir.

## Lisans Bildirimi

[Apache Lisansı 2.0](https://github.com/subadapcocuk/subadapp/blob/main/LICENSE),
uygulamada kullanılan kütüphanelerle uyumlu bir
[Özgür Yazılım](https://www.gnu.org/philosophy/free-sw.tr.html) lisansı olduğu
tercih edilmiştir. Bu lisans
[GNU GPL'nin 3. sürümüyle de uyumludur](https://www.gnu.org/licenses/license-list.tr.html#apache2).

## Disclaimer

Google Play and the Google Play logo are trademarks of Google LLC.
