# Şubadap Müzik Çalar

[Şubadap Müzik Çalar](https://github.com/kinefi/subadap-player), [Kinefi](https://github.com/kinefi) tarafından özgür yazılım olarak geliştirilen ve [Apache Lisansı 2.0](./LICENSE) kapsamında yayınlanan bir [React Native](https://reactnative.dev/) uygulamasıdır.

[![Expo Publish](https://github.com/kinefi/subadap-player/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/kinefi/subadap-player/actions/workflows/main.yml)

## Geliştirme

Geliştirme ortamı olarak [Expo](https://expo.dev/) kullanılıyor, kurulması için [Introduction to Expo](https://docs.expo.dev/) sayfasına bakılabilir. Komut satırı işlemleri için `expo-cli` ve paket yöneticisi olarak da [yarn](https://yarnpkg.com/) tercih edilmiştir. Aşağıdaki betikleri projenin olduğu dizinde kullanabilirsiniz:

- `yarn install`: Gerekli paketleri kurar, sadece `yarn` olarak da kullanabilirsiniz.
- `yarn start`: Expo sunucusunu başlatır.
- `yarn android`: Android emülatörünü başlatır, bunu ayrı bir terminalde başlatmanız gerekiyor.
- `yarn ios`: IOS emülatörünü başlatır, bunu ayrı bir terminalde başlatmanız gerekiyor.
- `yarn web`: Tarayıcıda görüntülemek için.
- `expo build:android`: Android paketi oluşturur.
- `expo build:ios`: IOS paket oluşturur.
- `yarn add <paket adı>`: Yeni bir paket/kütüphane eklemek için, belli bir pakete ihtiyacınız varsa <https://www.npmjs.com/> sayfasında arayabilirsiniz.

Tüm [albümler](./data/albums.json) ve [şarkılar](./data/songs.json) JSON olarak saklanıyor. Kolayca güncelleme ve JSON dosyalarını oluşturmak için [data/songs.xlsx](./data/songs.xlsx) dosyasından yararlanılabilir.

### Kullanılan Önemli Kütüphaneler

- [FontAwesome](https://github.com/FortAwesome/react-native-fontawesome) tarafından sunulan ücretsiz simgeler kullanılıyor
- [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/) ortam dosyaları için kullanılıyor

## Yayınlama ve test etme

Ana (`main`) dala gönderilen/itilen kod olması durumunda [`publish` görevi](.github/workflows/main.yml#L7) otomatik olarak çalışıyor ve Expo'ya [denenmeye hazır son sürümü](https://expo.io/@kinefi/subadap-player) itiyor. Bu yayınlama görevi Expo tarafından sunulan [örnek akışlardan](https://github.com/expo/expo-github-action#example-workflows) yararlanılarak eklendi.

Yerelde test etmeden önce ise aşağıdaki araçların kurulması gerekiyor:

- [nodejs](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install): `npm install --global yarn`
- [expo-cli](https://docs.expo.dev/workflow/expo-cli/): `npm install -g expo-cli`

Daha sonra aşağıdaki komutlar kullanılabilir:

```
yarn
yarn start
```

Açılacak pencereden telefonda karekod okutularak uygulama denenebilir.

## Şubadap Çocuk

[Şubadap Çocuk](https://subadapcocuk.org), çocuk şarkıları yapan bir müzik grubudur. 2013 yılında İzmir'de kurulmuştur. Çocukların, kendi hayatlarına değen, onların karşılaştıkları durumları/çelişkileri konu alan ve içinde yaşadıkları dünyaya dair kendi sözlerini söylemesini hedefleyen tematik şarkılar yapmaktadır. Bugüne kadar yayınlanmış 6 albümü ve toplam 40 şarkısı bulunmaktadır. Yalnızca kendi şarkılarını seslendirdiği çocuk şarkıları konserleriyle Türkiye, Kıbrıs, Almanya ve Hollanda'nın çeşitli yerlerinde bugüne dek 500'ün üzerinde yerde çocuklarla buluşmuştur. Konserleri yalnızca kentlerde değil, Türkiye'nin birçok bölgesindeki köy okullarında, mahallelerde, parklarda da vermiştir. Sahnede genellikle davul (bateri), bas gitar, gitar, flüt, keman, akordiyon, trompet ve mandolin çalgılarıyla yer almaktadır.

Uygulamada kullanılan ve bağlantı verilen tüm şarkılar, resimler, sayfalar, kitaplar, vb. [Şubadap Çocuk Ansiklopedisi](http://ansiklopedi.subadapcocuk.org/index.php/%C5%9Eubadap_%C3%87ocuk_Ansiklopedisi)ndedir. [Şubadap Çocuk](https://subadapcocuk.org) yaptığı tüm üretimleri [Copyleft](http://ansiklopedi.subadapcocuk.org/index.php/Copyleft) kapsamında yayınlamaktadır. Şarkılar doğrudan uygulamada yer almıyor, İnternet üzerinden akış şeklinde çalıyor. Dolayısıyla uygulamayı kullanabilmek için İnternet bağlantısı gerekmektedir.
