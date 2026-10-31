# ŞubadApp

<a href="https://apps.apple.com/tr/app/%C5%9Fubadapp/id1669825799"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/tr-tr?size=250x21" alt="App Store" style="height: 21px;"></a>
[![Play Store](https://img.shields.io/endpoint?color=32ca55&logo=google-play&logoColor=32ca55&url=https%3A%2F%2Fplay.cuzi.workers.dev%2Fplay%3Fi%3Dorg.subadapp%26l%3D%24name%26m%3D%24updated)](https://play.google.com/store/apps/details?id=org.subadapp)
[![Latest](https://img.shields.io/github/release/subadapcocuk/subadapp?labelColor=3b444c&logoColor=white&color=32ca55)](https://github.com/subadapcocuk/subadapp/releases/latest)
[![Licensed by Apache](https://img.shields.io/github/license/subadapcocuk/subadapp?labelColor=3b444c&logoColor=white&color=32ca55)](https://github.com/subadapcocuk/subadapp/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/subadapcocuk/subadapp?labelColor=3b444c&logoColor=white&color=32ca55)](https://github.com/subadapcocuk/subadapp/issues)
[![Android](https://github.com/subadapcocuk/subadapp/actions/workflows/android.yml/badge.svg)](https://github.com/subadapcocuk/subadapp/actions/workflows/android.yml)
[![iOS](https://github.com/subadapcocuk/subadapp/actions/workflows/ios.yml/badge.svg)](https://github.com/subadapcocuk/subadapp/actions/workflows/ios.yml)
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
- Fikirleriniz, sorularınız, genel düşünceleriniz varsa tartışma kısmına
  bakabilirsiniz: <https://github.com/subadapcocuk/subadapp/discussions>

## Geliştirme

[Expo](https://expo.dev/) kullanılarak geliştirilen bir
[React Native](https://reactnative.dev/) uygulamasıdır.

Geliştirme ortamı olarak [Expo](https://expo.dev/)'yu kurmak için
[Introduction to Expo](https://docs.expo.dev/) sayfasına bakılabilir. Paket
yöneticisi olarak da [pnpm](https://pnpm.io/) tercih edilmiştir. Bu
uygulamaları aşağıdaki gibi kurabilirsiniz:

- [node](https://nodejs.org/en/download/) (kurmak için
  [NVM](https://github.com/nvm-sh/nvm) de kullanabilirsiniz)
- [pnpm](https://pnpm.io/): `npm install --global pnpm`.
- [eas-cli](https://github.com/expo/eas-cli): `npm install --global eas-cli`

Ortam hazır olduktan sonra aşağıdaki betikleri projenin olduğu dizinde
kullanabilirsiniz:

- `pnpm install`: Gerekli paketleri kurar.
- `pnpm add <paket adı>`: Yeni bir paket/kütüphane eklemek için, belli bir
  pakete ihtiyacınız varsa <https://www.npmjs.com/> sayfasında arayabilirsiniz.
- `pnpm start`: Expo sunucusunu başlatır.
- `pnpm web`: Uygulamayı web tarayıcısında geliştirir ve test eder.
- `pnpm build:web`: Statik web çıktısını `dist/` klasörüne oluşturur.
- `pnpm android`: Android emülatörünü başlatır, bunu ayrı bir terminalde
  başlatmanız gerekiyor.
- `pnpm ios`: iOS emülatörünü başlatır, bunu ayrı bir terminalde başlatmanız
  gerekiyor.
- `pnpm build:android`: Android paketi oluşturur.
- `pnpm build:apk`: APK dosyasını yerelde oluşturur.
- `pnpm build:ios`: iOS paket oluşturur.
- `pnpm build:all`: Tüm paketleri oluşturur.
- `pnpm submit:android`: Android paketini Play Store'a gönderir.
- `pnpm submit:ios`: iOS paketini App Store'a gönderir.

Tüm albüm ve şarkı bilgileri [data/subadapp.xlsx](./data/subadapp.xlsx)
dosyasında tutulur. Web sürümünün kullanacağı JSON'u güncellemek için proje
kök dizininde şu komutu çalıştırın:

```bash
python3 data/export_subadapp.py
```

URL'ler Excel hücrelerinde köprü olarak değil, düz metin olarak tutulmalıdır.
Komut bu hücre metinlerini `public/subadapp.json` dosyasına aktarır. Görsel
adresi doğrudan bir resim dosyasına gitmiyorsa betik uyarı verir; şarkı için
geçerli albüm görselini, o da geçersizse uygulama ikonunu kullanır. Doğru
görseli eklemek için Excel'deki `image` hücresine doğrudan resim adresi girin.
Web kataloğundaki değişiklikleri yayımlamak için önce bu komutu, ardından
`pnpm build:web` komutunu çalıştırıp `dist/` klasörünü yayımlayın. Web sürümü
kataloğu aynı alandaki `subadapp.json` dosyasından, Android ve iOS sürümleri ise
[www.subadapcocuk.org/subadapp/subadapp.json](https://www.subadapcocuk.org/subadapp/subadapp.json)
adresinden okur. Excel'deki değişiklikleri yerel uygulamalara iletmek için
JSON dosyasını da bu adrese yükleyin.

Statik web çıktısının tamamını sunucudaki `subadapp/` klasörüne yükleyin; `dist`
klasörünün kendisini değil, içindeki dosya ve klasörleri kopyalayın. Uygulama
`https://www.subadapcocuk.org/subadapp/` ve
`https://ansiklopedi.subadapcocuk.org/subadapp/` adreslerinde çalışacak şekilde
yapılandırılmıştır.

## Yayınlama ve test etme

Sürüm yükseltmeden önce lisans listesini [license-report](https://www.npmjs.com/package/license-report)
aracıyla gözden geçirebilirsiniz:

```bash
npx license-report --only=prod --output=table
```

Yeni bir sürüm yayınlamak için `commit-and-tag-version` entegrasyonu kullanılır. Bu işlem `package.json`, `app.json` (version, versionCode, buildNumber) dosyalarını günceller, `CHANGELOG.md` içeriğini otomatik oluşturur ve git tag'i atar:

```bash
# Sürüm yükseltme simülasyonu (test etmek için):
pnpm release patch --dry-run

# Gerçek sürüm yükseltme:
pnpm release patch   # 0.27.5 -> 0.27.6
pnpm release minor   # 0.27.5 -> 0.28.0
pnpm release major   # 0.27.5 -> 1.0.0

# Değişiklikleri ve etiketleri uzak sunucuya gönderme:
git push --follow-tags origin main
```

Yerel uygulamayı Expo üzerinden başlatmak için:

```bash
pnpm start
```

Web uygulamasını tarayıcıda geliştirmek ve test etmek için:

```bash
pnpm web
```

⚠️ Bu komutların çalışması için yukarıda bağlantıları verilen `node`, `pnpm` ve
`expo-cli` araçlarının kurulu olması gerekiyor.

Komut satırındaki yönergelere uyulabilir veya açılacak pencereden telefonda
karekod okutularak uygulama denenebilir.

Web çıktısı, HTTPS destekleyen bir statik barındırma hizmetinde yayımlanabilir.
PWA olarak iPhone'da kullanmak için siteyi Safari'de açıp paylaş menüsünden
“Ana Ekrana Ekle” seçeneğini kullanın. Web sürümü şarkıları internet üzerinden
çalacağı için internet bağlantısı gerekir; arka planda çalma ve kilit ekranı
kontrolleri yerel iOS uygulamasındaki gibi garanti edilmez. Web sürümü şarkı
kataloğunu aynı alan adındaki `public/subadapp.json` dosyasından yükler; yeni
web yayını öncesinde bu dosyayı güncel katalogla eşitleyin.

## Şubadap Çocuk

[Şubadap Çocuk](https://subadapcocuk.org), çocuk şarkıları yapan bir müzik
grubudur. 2013 yılında İzmir'de kurulmuştur. Çocukların, kendi hayatlarına
değen, onların karşılaştıkları durumları/çelişkileri konu alan ve içinde
yaşadıkları dünyaya dair kendi sözlerini söylemesini hedefleyen tematik şarkılar
yapmaktadır. Bugüne kadar yayınlanmış 8 albümü ve toplam 51 şarkısı
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
