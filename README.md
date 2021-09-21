# Şubadap Müzik Çalar

[Şubadap Müzik Çalar](https://github.com/kinefi/subadap-player), [Kinefi](https://github.com/kinefi) tarafından özgür yazılım olarak geliştirilen ve [Apache Lisansı 2.0](./LICENSE) kapsamında yayınlanan bir [React Native](https://reactnative.dev/) uygulamasıdır.

## Geliştirme

Geliştirme ortamının kurulması için [Setting up the development environment](https://reactnative.dev/docs/environment-setup) yazısına bakılabilir. Komut satırı işlemleri için `React Native CLI Quickstart` ve paket yöneticisi olarak da [yarn](https://yarnpkg.com/) tercih edilmiştir. Aşağıdaki betikleri projenin olduğu dizinde kullanabilirsiniz:

- `yarn install`: Gerekli paketleri kurar, sadece `yarn` olarak da kullanabilirsiniz.
- `yarn start`: Metro sunucusunu başlatır.
- `yarn android`: Android emülatörünü başlatır, bunu ayrı bir terminalde başlatmanız gerekiyor.
- `yarn ios`: IOS emülatörünü başlatır, bunu ayrı bir terminalde başlatmanız gerekiyor.
- `yarn apk`: APK oluşturur, oluşturulan APK [android/app/build/outputs/bundle/release/](./android/app/build/outputs/bundle/release/) dizini altındadır.
- `yarn add <paket adı>`: Yeni bir paket/kütüphane eklemek için, belli bir pakete ihtiyacınız varsa <https://www.npmjs.com/> sayfasında arayabilirsiniz.

Tüm [albümler](./data/albums.json) ve [şarkılar](./data/songs.json) JSON olarak saklanıyor. Kolayca güncelleme ve JSON dosyalarını oluşturmak için [data/songs.xlsx](./data/songs.xlsx) dosyasından yararlanılabilir.

### Kullanılan Önemli Kütüphaneler

- Simgeler için [FontAwesome](https://github.com/FortAwesome/react-native-fontawesome) ve sağladığı ücretsiz simgeler
- Şarkıların MP3 biçimindeki dosyalarını çalmak için [React Native Sound Player](https://github.com/johnsonsu/react-native-sound-player)

## Şubadap Çocuk

[Şubadap Çocuk](https://subadapcocuk.org), çocuk şarkıları yapan bir müzik grubudur. 2013 yılında İzmir'de kurulmuştur. Çocukların, kendi hayatlarına değen, onların karşılaştıkları durumları/çelişkileri konu alan ve içinde yaşadıkları dünyaya dair kendi sözlerini söylemesini hedefleyen tematik şarkılar yapmaktadır. Bugüne kadar yayınlanmış 6 albümü ve toplam 40 şarkısı bulunmaktadır. Yalnızca kendi şarkılarını seslendirdiği çocuk şarkıları konserleriyle Türkiye, Kıbrıs, Almanya ve Hollanda'nın çeşitli yerlerinde bugüne dek 500'ün üzerinde yerde çocuklarla buluşmuştur. Konserleri yalnızca kentlerde değil, Türkiye'nin birçok bölgesindeki köy okullarında, mahallelerde, parklarda da vermiştir. Sahnede genellikle davul (bateri), bas gitar, gitar, flüt, keman, akordiyon, trompet ve mandolin çalgılarıyla yer almaktadır.

Uygulamada kullanılan ve bağlantı verilen tüm şarkılar, resimler, sayfalar, kitaplar, vb. [Şubadap Çocuk Ansiklopedisi](http://ansiklopedi.subadapcocuk.org/index.php/%C5%9Eubadap_%C3%87ocuk_Ansiklopedisi)ndedir. [Şubadap Çocuk](https://subadapcocuk.org) yaptığı tüm üretimleri [Copyleft](http://ansiklopedi.subadapcocuk.org/index.php/Copyleft) kapsamında yayınlamaktadır. Şarkılar doğrudan uygulamada yer almıyor, İnternet üzerinden akış şeklinde çalıyor. Dolayısıyla uygulamayı kullanabilmek için İnternet bağlantısı gerekmektedir.
