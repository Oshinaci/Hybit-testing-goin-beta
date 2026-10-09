import { useAppSettings } from '../context/AppSettingsContext';

export interface LandingDictionary {
  navbar: {
    features: string;
    preview: string;
    security: string;
    networks: string;
    faq: string;
    app: string;
    comingSoon: string;
    connectWallet: string;
    openHybit: string;
    homeAria: string;
    menuAria: string;
  };
  hero: {
    kicker: string;
    headlinePart1: string;
    headlineHighlight: string;
    subheadline: string;
    openHybit: string;
    downloadApp: string;
    comingSoon: string;
    fact1Title: string;
    fact1Subtitle: string;
    fact2Title: string;
    fact2Subtitle: string;
    fact3Title: string;
    fact3Subtitle: string;
  };
  trustedBy: {
    sectionTitle: string;
    roles: {
      layer1: string;
      layer2: string;
      evmChain: string;
      bridgeProtocol: string;
      usdcIssuer: string;
      dataOracle: string;
      connectionProtocol: string;
    };
  };
  features: {
    kicker: string;
    titlePart1: string;
    titlePart2: string;
    subtitle: string;
    items: Array<{
      id: string;
      subtitle: string;
      title: string;
      description: string;
      details: string[];
    }>;
  };
  walletPreview: {
    kicker: string;
    title: string;
    subtitle: string;
    tagline: string;
    openHybit: string;
    totalBalanceLabel: string;
    vsPreviousPeriod: string;
    toastTimeframe: string;
    toastChange: string;
    swapTitle: string;
    swapEstFeeBadge: string;
    payLabel: string;
    payBalance: string;
    receiveLabel: string;
    receiveEstFee: string;
    exchangeRateLabel: string;
    swapRouteLabel: string;
    swapRouteValue: string;
    txCheckLabel: string;
    txCheckValue: string;
    simulatedSuccess: string;
    simulatingRoute: string;
    trySwapSimulation: string;
  };
  security: {
    kicker: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      id: string;
      subtitle: string;
      title: string;
      badge: string;
      description: string;
      points: string[];
    }>;
    bottomTitle: string;
    bottomSubtitle: string;
    bottomLink: string;
  };
  ecosystem: {
    kicker: string;
    title: string;
    subtitle: string;
    filters: {
      all: string;
      l2: string;
      evm: string;
      nonEvm: string;
    };
    telemetry: {
      speed: string;
      gasFee: string;
      finality: string;
    };
    networks: Array<{
      id: string;
      name: string;
      type: 'L2' | 'EVM' | 'Non-EVM';
      tps: string;
      avgFee: string;
      finality: string;
      token: string;
      description: string;
    }>;
  };
  principles: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      company: string;
      avatar: string;
      quote: string;
      metric: string;
    }>;
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
  cta: {
    kicker: string;
    title: string;
    subtitle: string;
    openHybit: string;
    downloadApp: string;
    comingSoon: string;
    guarantee1: string;
    guarantee2: string;
    guarantee3: string;
  };
  footer: {
    description: string;
    version: string;
    productHeading: string;
    guidesHeading: string;
    legalHeading: string;
    links: {
      product: Array<{ label: string; href: string }>;
      guides: Array<{ label: string; href: string }>;
      legal: Array<{ label: string; href: string }>;
    };
    copyright: string;
    noticePlaceholder: string;
  };
  phoneMockup: {
    time: string;
    hybitId: string;
    saldoLabel: string;
    todayGain: string;
    actions: {
      send: string;
      receive: string;
      swap: string;
      buy: string;
      bridge: string;
    };
    assetsHeading: string;
    assetsSubheading: string;
    viewAll: string;
    nav: {
      home: string;
      portfolio: string;
      swap: string;
      history: string;
      settings: string;
    };
  };
  drawer: {
    navigationHeading: string;
    appMobile: string;
    comingSoon: string;
    connectWallet: string;
    disconnect: string;
    openHybit: string;
    note1: string;
    note2: string;
  };
  connectModal: {
    title: string;
    subtitle: string;
    recommendedBadge: string;
    connectedBadge: string;
    footerNotice: string;
    options: Array<{
      id: string;
      name: string;
      description: string;
      badge: string;
      recommended?: boolean;
    }>;
  };
}

export const LANDING_TRANSLATIONS: Record<'id' | 'en', LandingDictionary> = {
  id: {
    navbar: {
      features: 'Fitur',
      preview: 'Tampilan',
      security: 'Keamanan',
      networks: 'Jaringan',
      faq: 'FAQ',
      app: 'Aplikasi',
      comingSoon: '· Segera Hadir',
      connectWallet: 'Hubungkan Wallet',
      openHybit: 'Buka Hybit',
      homeAria: 'Beranda Hybit',
      menuAria: 'Buka menu navigasi',
    },
    hero: {
      kicker: '1 Email, 1 Wallet · Hybit ID',
      headlinePart1: 'Dompet crypto semudah ',
      headlineHighlight: 'mata memandang.',
      subheadline:
        'Tampilan mudah, modern, dan tetap profesional. Kirim dan terima aset menggunakan Hybit ID tanpa perlu menghafal alamat panjang.',
      openHybit: 'Buka Hybit',
      downloadApp: 'Unduh Aplikasi',
      comingSoon: '· Segera Hadir',
      fact1Title: '1 Email',
      fact1Subtitle: '1 Wallet pribadi',
      fact2Title: 'Hybit ID',
      fact2Subtitle: 'Nama kirim & terima',
      fact3Title: 'Passkey',
      fact3Subtitle: 'Akses di perangkat',
    },
    trustedBy: {
      sectionTitle: 'Jaringan dan Protokol yang Didukung',
      roles: {
        layer1: 'Layer 1',
        layer2: 'Layer 2',
        evmChain: 'EVM Chain',
        bridgeProtocol: 'Bridge Protokol',
        usdcIssuer: 'Penerbit USDC',
        dataOracle: 'Oracle Data',
        connectionProtocol: 'Protokol Koneksi',
      },
    },
    features: {
      kicker: 'Fitur Utama',
      titlePart1: 'Kemudahan transaksi',
      titlePart2: 'dalam satu dompet.',
      subtitle:
        'Mulai dari nama pengenal Hybit ID hingga pemantauan portofolio, semua dirancang agar nyaman digunakan setiap hari.',
      items: [
        {
          id: 'embedded-wallet',
          subtitle: 'Akses Satu Langkah',
          title: 'Embedded Wallet',
          description:
            'Masuk langsung menggunakan email dan passkey perangkat. Satu email terhubung ke satu wallet pribadi Anda.',
          details: [
            'Login dengan email dan passkey',
            'Satu akun terikat pada satu dompet',
            'Verifikasi langsung di perangkat',
          ],
        },
        {
          id: 'hybit-id',
          subtitle: 'Nama Pengganti Alamat',
          title: 'Hybit ID',
          description:
            'Kirim dan terima aset menggunakan nama unik Anda. Lebih mudah dibaca dibanding menyalin deretan karakter panjang.',
          details: [
            'Nama pengenal pribadi yang ringkas',
            'Digunakan untuk transfer dan penerimaan',
            'Menghindari salah ketik alamat',
          ],
        },
        {
          id: 'token-swap',
          subtitle: 'Tukar Aset',
          title: 'Swap Token',
          description:
            'Tukar aset crypto langsung di dalam dompet. Nilai tukar dan estimasi biaya ditampilkan sebelum konfirmasi.',
          details: [
            'Pilihan token di berbagai jaringan',
            'Estimasi biaya tampil di awal',
            'Konfirmasi dalam aplikasi',
          ],
        },
        {
          id: 'cross-chain-bridge',
          subtitle: 'Perpindahan Saldo',
          title: 'Bridge Antar-Jaringan',
          description:
            'Pindahkan aset antar-jaringan yang didukung. Pantau kemajuan perpindahan saldo secara teratur.',
          details: [
            'Dukungan jaringan utama',
            'Status transaksi dapat dipantau',
            'Saldo diperbarui otomatis',
          ],
        },
        {
          id: 'portfolio-tracking',
          subtitle: 'Informasi Saldo',
          title: 'Pantauan Portofolio',
          description:
            'Lihat ringkasan total nilai aset dan riwayat transaksi. Seluruh aset terangkum dalam satu tampilan yang rapi.',
          details: [
            'Ringkasan total nilai bersih',
            'Riwayat aktivitas terperinci',
            'Pilihan tampilan mata uang',
          ],
        },
        {
          id: 'transaction-control',
          subtitle: 'Kendali Penuh',
          title: 'Persetujuan Transaksi',
          description:
            'Setiap pengiriman dan penukaran aset memerlukan otorisasi dari Anda sebelum diteruskan ke jaringan.',
          details: [
            'Periksa rincian sebelum menyetujui',
            'Infrastruktur kunci terenkripsi',
            'Pemberitahuan status langsung',
          ],
        },
      ],
    },
    walletPreview: {
      kicker: 'Tampilan Konsol Web',
      title: 'Tampilan rapi, informasi jelas.',
      subtitle:
        'Pantau portofolio, riwayat pergerakan nilai aset, dan simulasi penukaran token dalam satu layar kerja yang teratur.',
      tagline: '1 Email, 1 Wallet',
      openHybit: 'Buka Hybit',
      totalBalanceLabel: 'Total Saldo Portofolio',
      vsPreviousPeriod: 'dibanding periode sebelumnya',
      toastTimeframe: 'Periode Grafik',
      toastChange: 'Perubahan',
      swapTitle: 'Simulasi Swap Token',
      swapEstFeeBadge: 'Estimasi Biaya',
      payLabel: 'Bayar',
      payBalance: 'Saldo: 2.45 ETH',
      receiveLabel: 'Terima',
      receiveEstFee: 'Est. Biaya: $0.12 (Base)',
      exchangeRateLabel: 'Nilai Tukar',
      swapRouteLabel: 'Rute Swap',
      swapRouteValue: 'Protokol Terpilih',
      txCheckLabel: 'Pemeriksaan Transaksi',
      txCheckValue: 'Aktif',
      simulatedSuccess: 'Simulasi Berhasil',
      simulatingRoute: 'Menghitung Rute...',
      trySwapSimulation: 'Coba Simulasi Swap',
    },
    security: {
      kicker: 'Prinsip Keamanan',
      title: 'Akses aman, kendali tetap pada Anda.',
      subtitle:
        'Hybit menerapkan verifikasi passkey dan infrastruktur terenkripsi agar pengelolaan aset digital berlangsung dengan tenang.',
      pillars: [
        {
          id: 'user-control',
          subtitle: 'Kendali Transaksi',
          title: 'Persetujuan Pengguna',
          badge: 'Otorisasi Mandiri',
          description:
            'Setiap transaksi kirim, swap, dan bridge memerlukan konfirmasi langsung dari Anda. Tidak ada saldo yang dapat berpindah tanpa persetujuan eksplisit dari Anda.',
          points: [
            'Konfirmasi detail sebelum kirim',
            'Pemeriksaan alamat atau Hybit ID',
            'Notifikasi status setiap tindakan',
          ],
        },
        {
          id: 'passkey-login',
          subtitle: 'Login Perangkat',
          title: 'Akses Passkey',
          badge: 'Biometrik Perangkat',
          description:
            'Masuk ke dompet dengan praktis menggunakan passkey perangkat Anda. Cepat digunakan tanpa perlu mengingat kata sandi yang rumit.',
          points: [
            'Autentikasi di perangkat Anda',
            'Satu email terhubung ke satu wallet',
            'Bebas dari risiko lupa sandi',
          ],
        },
        {
          id: 'encrypted-infrastructure',
          subtitle: 'Sistem Terisolasi',
          title: 'Infrastruktur Terenkripsi',
          badge: 'Infrastruktur Khusus',
          description:
            'Kunci wallet dikelola melalui infrastruktur khusus yang terisolasi dan terenkripsi untuk mengamankan setiap proses transaksi.',
          points: [
            'Enkripsi data transaksi',
            'Penandatanganan terisolasi',
            'Perlindungan sesi akun',
          ],
        },
        {
          id: 'account-recovery',
          subtitle: 'Bantuan Masuk',
          title: 'Pemulihan Akses',
          badge: 'Akses Terverifikasi',
          description:
            'Ketika Anda berganti perangkat, akses dompet dapat dipulihkan kembali menggunakan alamat email terdaftar yang terverifikasi.',
          points: [
            'Verifikasi via email resmi',
            'Pemasangan passkey baru',
            'Proses pemulihan terarah',
          ],
        },
        {
          id: 'data-privacy',
          subtitle: 'Perlindungan Informasi',
          title: 'Privasi Pengguna',
          badge: 'Prinsip Privasi',
          description:
            'Hybit memprioritaskan privasi Anda dengan hanya memproses data yang dibutuhkan untuk menjalankan fungsionalitas dompet.',
          points: [
            'Hanya data transaksi penting',
            'Transmisi terenkripsi',
            'Pengaturan yang transparan',
          ],
        },
      ],
      bottomTitle: 'Standar Keamanan Berkelanjutan',
      bottomSubtitle:
        'Arsitektur keamanan dirancang dengan fokus pada privasi dan perlindungan akses Anda',
      bottomLink: 'Pelajari di FAQ',
    },
    ecosystem: {
      kicker: 'Jaringan Didukung',
      title: 'Terhubung ke berbagai jaringan.',
      subtitle:
        'Akses saldo dan lakukan transaksi pada jaringan EVM, Layer 2, maupun non-EVM pilihan Anda.',
      filters: {
        all: 'Semua',
        l2: 'L2',
        evm: 'EVM',
        nonEvm: 'Non-EVM',
      },
      telemetry: {
        speed: 'Kecepatan',
        gasFee: 'Biaya Gas',
        finality: 'Konfirmasi',
      },
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum',
          type: 'EVM',
          tps: 'Standar',
          avgFee: 'Variatif',
          finality: '~12 mnt',
          token: 'ETH',
          description: 'Jaringan lapisan dasar untuk token dan aplikasi terdesentralisasi.',
        },
        {
          id: 'base',
          name: 'Base',
          type: 'L2',
          tps: 'Cepat',
          avgFee: 'Rendah',
          finality: '~1 dtk',
          token: 'ETH',
          description: 'Jaringan Layer 2 dengan konfirmasi cepat dan biaya gas hemat.',
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          type: 'L2',
          tps: 'Cepat',
          avgFee: 'Rendah',
          finality: '~1 dtk',
          token: 'ETH',
          description: 'Jaringan rollup Layer 2 untuk ekosistem Ethereum.',
        },
        {
          id: 'optimism',
          name: 'Optimism',
          type: 'L2',
          tps: 'Cepat',
          avgFee: 'Rendah',
          finality: '~1 dtk',
          token: 'ETH',
          description: 'Solusi penskalaan Layer 2 bagian dari ekosistem Superchain.',
        },
        {
          id: 'polygon',
          name: 'Polygon PoS',
          type: 'EVM',
          tps: 'Cepat',
          avgFee: 'Rendah',
          finality: '~2 dtk',
          token: 'POL',
          description: 'Jaringan kompatibel EVM untuk transaksi sehari-hari yang efisien.',
        },
        {
          id: 'bnb',
          name: 'BNB Chain',
          type: 'EVM',
          tps: 'Cepat',
          avgFee: 'Rendah',
          finality: '~3 dtk',
          token: 'BNB',
          description: 'Jaringan smart contract dengan ekosistem aplikasi yang luas.',
        },
        {
          id: 'solana',
          name: 'Solana',
          type: 'Non-EVM',
          tps: 'Tinggi',
          avgFee: 'Minimal',
          finality: '< 1 dtk',
          token: 'SOL',
          description: 'Jaringan Layer 1 dengan pemrosesan paralel berkecepatan tinggi.',
        },
        {
          id: 'sui',
          name: 'Sui Network',
          type: 'Non-EVM',
          tps: 'Tinggi',
          avgFee: 'Minimal',
          finality: '< 1 dtk',
          token: 'SUI',
          description: 'Jaringan Layer 1 berbasis bahasa Move untuk transaksi cepat.',
        },
        {
          id: 'aptos',
          name: 'Aptos',
          type: 'Non-EVM',
          tps: 'Tinggi',
          avgFee: 'Minimal',
          finality: '< 1 dtk',
          token: 'APT',
          description: 'Jaringan Layer 1 dengan mesin eksekusi paralel.',
        },
      ],
    },
    principles: {
      kicker: 'Prinsip Hybit',
      title: 'Fondasi yang kami pegang teguh.',
      subtitle:
        'Tiga komitmen utama kami dalam mengembangkan Hybit agar nyaman dan terpercaya untuk Anda.',
      items: [
        {
          id: '1',
          name: 'Kejelasan Tampilan',
          role: 'Prinsip 01',
          company: 'Desain Nyaman',
          avatar: '01',
          quote:
            'Informasi saldo, pergerakan nilai, dan opsi transaksi disajikan secara wajar tanpa istilah teknis yang berbelit-belit.',
          metric: 'Antarmuka terstruktur dan mudah dipahami',
        },
        {
          id: '2',
          name: 'Kemudahan Transaksi',
          role: 'Prinsip 02',
          company: 'Hybit ID',
          avatar: '02',
          quote:
            'Kirim dan terima aset cukup dengan nama pengenal Hybit ID Anda. Menghindari kekhawatiran salah menyalin alamat panjang.',
          metric: 'Transfer lebih tenang dengan nama unik',
        },
        {
          id: '3',
          name: 'Keterbukaan Informasi',
          role: 'Prinsip 03',
          company: 'Transparansi',
          avatar: '03',
          quote:
            'Estimasi biaya jaringan dan detail transaksi ditampilkan apa adanya sebelum Anda memutuskan untuk menyetujuinya.',
          metric: 'Tanpa janji atau biaya tersembunyi',
        },
      ],
    },
    faq: {
      kicker: 'Pertanyaan Umum',
      title: 'Hal yang sering ditanyakan.',
      subtitle:
        'Informasi mengenai cara kerja Hybit, pengelolaan akun, dan dukungan jaringan.',
      items: [
        {
          id: 'faq-1',
          question: 'Apa itu Hybit ID?',
          answer:
            'Hybit ID adalah nama unik milik Anda untuk mengirim dan menerima aset di dompet Hybit. Nama ini menggantikan deretan karakter alamat wallet yang panjang agar proses transfer lebih mudah dibaca dan diingat.',
        },
        {
          id: 'faq-2',
          question: 'Bagaimana cara membuat wallet di Hybit?',
          answer:
            'Anda cukup mendaftar dengan alamat email dan mengaktifkan passkey di perangkat Anda. Konsep Hybit adalah satu email terhubung ke satu wallet pribadi.',
        },
        {
          id: 'faq-3',
          question: 'Siapa yang memegang kendali atas aset dan kunci wallet?',
          answer:
            'Anda memegang kendali atas setiap transaksi. Kunci dikelola melalui infrastruktur khusus yang terisolasi dan terenkripsi. Pengiriman maupun penukaran aset membutuhkan otorisasi langsung dari Anda.',
        },
        {
          id: 'faq-4',
          question: 'Bagaimana jika perangkat saya hilang atau berganti?',
          answer:
            'Anda dapat memulihkan akses akun melalui alamat email terdaftar dan mengatur passkey baru pada perangkat pengganti. Panduan pemulihan lebih lanjut akan diumumkan menjelang rilis.',
        },
        {
          id: 'faq-5',
          question: 'Jaringan apa saja yang didukung oleh Hybit?',
          answer:
            'Hybit mendukung jaringan utama seperti Ethereum, Base, Solana, Arbitrum, Optimism, Polygon, dan BNB Chain. Daftar jaringan yang aktif pada peluncuran perdana akan diumumkan menjelang rilis.',
        },
        {
          id: 'faq-6',
          question: 'Apakah ada biaya saat bertransaksi di Hybit?',
          answer:
            'Setiap transaksi hanya dikenakan biaya gas standar dari jaringan blockchain yang Anda gunakan. Estimasi biaya transaksi selalu ditampilkan sebelum Anda menyetujui transaksi. Rincian ketentuan biaya lainnya akan diumumkan menjelang rilis.',
        },
      ],
    },
    cta: {
      kicker: '1 Email, 1 Wallet · Hybit ID',
      title: 'Mulai gunakan Hybit.',
      subtitle:
        'Daftar menggunakan email dan siapkan Hybit ID Anda. Nikmati kemudahan kirim, terima, dan kelola aset crypto langsung di browser Anda.',
      openHybit: 'Buka Hybit',
      downloadApp: 'Unduh Aplikasi',
      comingSoon: '· Segera Hadir',
      guarantee1: '1 Email untuk 1 Wallet',
      guarantee2: 'Transfer dengan Hybit ID',
      guarantee3: 'Persetujuan di Setiap Transaksi',
    },
    footer: {
      description:
        'Dompet crypto dengan tampilan yang mudah, modern, dan tetap profesional. Kirim dan terima aset menggunakan Hybit ID, cukup 1 email untuk 1 wallet.',
      version: 'Versi Pratinjau v1.0.0',
      productHeading: 'Produk',
      guidesHeading: 'Panduan',
      legalHeading: 'Legal & Privasi',
      links: {
        product: [
          { label: 'Fitur', href: '#features' },
          { label: 'Tampilan', href: '#preview' },
          { label: 'Keamanan', href: '#security' },
          { label: 'Jaringan', href: '#ecosystem' },
        ],
        guides: [
          { label: 'Dokumentasi', href: '#' },
          { label: 'Pertanyaan Umum', href: '#faq' },
          { label: 'Catatan Rilis', href: '#' },
          { label: 'Unduh Aplikasi', href: '#' },
        ],
        legal: [
          { label: 'Kebijakan Privasi', href: '#' },
          { label: 'Syarat & Ketentuan', href: '#' },
          { label: 'Prinsip Keamanan', href: '#security' },
          { label: 'Keterbukaan Informasi', href: '#' },
        ],
      },
      copyright: `© ${new Date().getFullYear()} Hybit. Seluruh hak cipta dilindungi undang-undang.`,
      noticePlaceholder: 'Halaman informasi akan tersedia menjelang rilis.',
    },
    phoneMockup: {
      time: '09:41',
      hybitId: 'alex.hybit',
      saldoLabel: 'Saldo',
      todayGain: '+$1.142,30 (+8,4%) Hari ini',
      actions: {
        send: 'Kirim',
        receive: 'Terima',
        swap: 'Swap',
        buy: 'Beli',
        bridge: 'Bridge',
      },
      assetsHeading: 'Daftar Aset',
      assetsSubheading: 'Aset di dompet pribadi Anda',
      viewAll: 'Semua',
      nav: {
        home: 'Beranda',
        portfolio: 'Portofolio',
        swap: 'SWAP',
        history: 'Riwayat',
        settings: 'Pengaturan',
      },
    },
    drawer: {
      navigationHeading: 'Navigasi',
      appMobile: 'Aplikasi Mobile',
      comingSoon: '· Segera Hadir',
      connectWallet: 'Hubungkan Wallet',
      disconnect: 'Putuskan',
      openHybit: 'Buka Hybit',
      note1: '1 Email, 1 Wallet',
      note2: 'Versi Awal v1.0.0',
    },
    connectModal: {
      title: 'Hubungkan Wallet',
      subtitle: '1 Email, 1 Wallet Pribadi',
      recommendedBadge: 'Utama',
      connectedBadge: 'Terhubung',
      footerNotice: 'Infrastruktur Kunci Terenkripsi',
      options: [
        {
          id: 'privy',
          name: 'Privy Embedded Wallet',
          description: 'Masuk dengan Email & Passkey perangkat',
          badge: 'Utama',
          recommended: true,
        },
        {
          id: 'metamask',
          name: 'MetaMask',
          description: 'Hubungkan via ekstensi browser atau aplikasi',
          badge: 'EVM',
        },
        {
          id: 'coinbase',
          name: 'Coinbase Smart Wallet',
          description: 'Hubungkan dengan passkey akun Coinbase',
          badge: 'Passkey',
        },
        {
          id: 'phantom',
          name: 'Phantom',
          description: 'Dompet multi-chain Solana & Ethereum',
          badge: 'Multi-Chain',
        },
        {
          id: 'walletconnect',
          name: 'WalletConnect',
          description: 'Pindai kode QR dari berbagai dompet crypto',
          badge: 'Universal',
        },
      ],
    },
  },
  en: {
    navbar: {
      features: 'Features',
      preview: 'Preview',
      security: 'Security',
      networks: 'Networks',
      faq: 'FAQ',
      app: 'App',
      comingSoon: '· Coming Soon',
      connectWallet: 'Connect Wallet',
      openHybit: 'Open Hybit',
      homeAria: 'Hybit Home',
      menuAria: 'Open navigation menu',
    },
    hero: {
      kicker: '1 Email, 1 Wallet · Hybit ID',
      headlinePart1: 'Crypto wallet as clear ',
      headlineHighlight: 'as day.',
      subheadline:
        'Clean, modern, and professional. Send and receive assets with your unique Hybit ID instead of memorizing long hex addresses.',
      openHybit: 'Open Hybit',
      downloadApp: 'Download App',
      comingSoon: '· Coming Soon',
      fact1Title: '1 Email',
      fact1Subtitle: '1 Personal wallet',
      fact2Title: 'Hybit ID',
      fact2Subtitle: 'Handle for transfers',
      fact3Title: 'Passkey',
      fact3Subtitle: 'On-device access',
    },
    trustedBy: {
      sectionTitle: 'Supported Networks and Protocols',
      roles: {
        layer1: 'Layer 1',
        layer2: 'Layer 2',
        evmChain: 'EVM Chain',
        bridgeProtocol: 'Bridge Protocol',
        usdcIssuer: 'USDC Issuer',
        dataOracle: 'Data Oracle',
        connectionProtocol: 'Connection Protocol',
      },
    },
    features: {
      kicker: 'Core Features',
      titlePart1: 'Straightforward transactions',
      titlePart2: 'in one wallet.',
      subtitle:
        'From memorable Hybit IDs to clear portfolio tracking, designed for everyday ease.',
      items: [
        {
          id: 'embedded-wallet',
          subtitle: 'One-Step Access',
          title: 'Embedded Wallet',
          description:
            'Sign in directly with your email and device passkey. One email connects to one personal wallet.',
          details: [
            'Email and passkey sign-in',
            'One account bound to one wallet',
            'Direct on-device authentication',
          ],
        },
        {
          id: 'hybit-id',
          subtitle: 'Readable Handle',
          title: 'Hybit ID',
          description:
            'Send and receive assets using your unique name. Clear to read and simpler than copying long hex strings.',
          details: [
            'Compact personal identifier',
            'Used for sending and receiving',
            'Helps avoid mistyped addresses',
          ],
        },
        {
          id: 'token-swap',
          subtitle: 'Asset Exchange',
          title: 'Token Swap',
          description:
            'Exchange crypto assets directly inside the wallet. Rates and estimated fees are shown before you confirm.',
          details: [
            'Token options across networks',
            'Upfront fee estimations',
            'In-app confirmation prompt',
          ],
        },
        {
          id: 'cross-chain-bridge',
          subtitle: 'Network Transfers',
          title: 'Cross-Chain Bridge',
          description:
            'Move assets across supported networks. Follow the progress of your transfer in real time.',
          details: [
            'Support for major networks',
            'Track transfer status',
            'Automated balance updates',
          ],
        },
        {
          id: 'portfolio-tracking',
          subtitle: 'Balance Overview',
          title: 'Portfolio Tracking',
          description:
            'View your total asset value and transaction history. Every holding organized in one structured view.',
          details: [
            'Total net balance summary',
            'Detailed activity records',
            'Custom display currency options',
          ],
        },
        {
          id: 'transaction-control',
          subtitle: 'Full Control',
          title: 'Transaction Approval',
          description:
            'Every send and swap action requires your explicit approval before it is submitted to the network.',
          details: [
            'Review details prior to approval',
            'Encrypted key infrastructure',
            'Immediate status updates',
          ],
        },
      ],
    },
    walletPreview: {
      kicker: 'Web Console Preview',
      title: 'Orderly layout, clear information.',
      subtitle:
        'Review portfolio value, performance curves, and simulated token swaps in one clean workspace.',
      tagline: '1 Email, 1 Wallet',
      openHybit: 'Open Hybit',
      totalBalanceLabel: 'Total Portfolio Balance',
      vsPreviousPeriod: 'vs previous period',
      toastTimeframe: 'Chart Timeframe',
      toastChange: 'Change',
      swapTitle: 'Token Swap Simulation',
      swapEstFeeBadge: 'Estimated Fee',
      payLabel: 'Pay',
      payBalance: 'Balance: 2.45 ETH',
      receiveLabel: 'Receive',
      receiveEstFee: 'Est. Fee: $0.12 (Base)',
      exchangeRateLabel: 'Exchange Rate',
      swapRouteLabel: 'Swap Route',
      swapRouteValue: 'Selected Protocol',
      txCheckLabel: 'Transaction Check',
      txCheckValue: 'Active',
      simulatedSuccess: 'Simulation Completed',
      simulatingRoute: 'Calculating Route...',
      trySwapSimulation: 'Try Swap Simulation',
    },
    security: {
      kicker: 'Security Principles',
      title: 'Secure access, control in your hands.',
      subtitle:
        'Hybit combines passkey authentication with encrypted infrastructure so managing digital assets stays dependable.',
      pillars: [
        {
          id: 'user-control',
          subtitle: 'Transaction Control',
          title: 'User Authorization',
          badge: 'Self-Authorized',
          description:
            'Every send, swap, and bridge transaction requires your direct confirmation. No funds move without your explicit approval.',
          points: [
            'Confirm details before sending',
            'Verify address or Hybit ID',
            'Instant notification for each action',
          ],
        },
        {
          id: 'passkey-login',
          subtitle: 'Device Sign-In',
          title: 'Passkey Access',
          badge: 'Device Biometrics',
          description:
            'Sign in quickly using your device passkey. Fast and convenient without memorizing complex passwords.',
          points: [
            'On-device authentication',
            'One email linked to one wallet',
            'Free from forgotten password risks',
          ],
        },
        {
          id: 'encrypted-infrastructure',
          subtitle: 'Isolated Systems',
          title: 'Encrypted Infrastructure',
          badge: 'Dedicated Core',
          description:
            'Wallet keys are managed through isolated, encrypted infrastructure built to protect every transaction signing step.',
          points: [
            'Transaction data encryption',
            'Isolated signing execution',
            'Protected account sessions',
          ],
        },
        {
          id: 'account-recovery',
          subtitle: 'Access Recovery',
          title: 'Account Recovery',
          badge: 'Verified Access',
          description:
            'When switching devices, wallet access can be recovered using your verified registered email address.',
          points: [
            'Verification through registered email',
            'Enrollment of new device passkey',
            'Guided recovery procedure',
          ],
        },
        {
          id: 'data-privacy',
          subtitle: 'Information Safeguards',
          title: 'User Privacy',
          badge: 'Privacy Focus',
          description:
            'Hybit values your privacy by processing only the information necessary to provide core wallet functionality.',
          points: [
            'Essential transaction data only',
            'Encrypted transmissions',
            'Transparent settings',
          ],
        },
      ],
      bottomTitle: 'Continuous Security Standards',
      bottomSubtitle:
        'Security architecture built with a focus on privacy and user access protection',
      bottomLink: 'Learn more in FAQ',
    },
    ecosystem: {
      kicker: 'Supported Networks',
      title: 'Connected across diverse networks.',
      subtitle:
        'Access balances and transact on EVM, Layer 2, or non-EVM networks of your choice.',
      filters: {
        all: 'All',
        l2: 'L2',
        evm: 'EVM',
        nonEvm: 'Non-EVM',
      },
      telemetry: {
        speed: 'Speed',
        gasFee: 'Gas Fee',
        finality: 'Finality',
      },
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum',
          type: 'EVM',
          tps: 'Standard',
          avgFee: 'Variable',
          finality: '~12 min',
          token: 'ETH',
          description: 'Foundational base layer for tokens and decentralized applications.',
        },
        {
          id: 'base',
          name: 'Base',
          type: 'L2',
          tps: 'Fast',
          avgFee: 'Low',
          finality: '~1 sec',
          token: 'ETH',
          description: 'Layer 2 network offering swift confirmations and low gas fees.',
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          type: 'L2',
          tps: 'Fast',
          avgFee: 'Low',
          finality: '~1 sec',
          token: 'ETH',
          description: 'Layer 2 rollup scaling solution for the Ethereum ecosystem.',
        },
        {
          id: 'optimism',
          name: 'Optimism',
          type: 'L2',
          tps: 'Fast',
          avgFee: 'Low',
          finality: '~1 sec',
          token: 'ETH',
          description: 'Layer 2 scaling solution and core component of the Superchain.',
        },
        {
          id: 'polygon',
          name: 'Polygon PoS',
          type: 'EVM',
          tps: 'Fast',
          avgFee: 'Low',
          finality: '~2 sec',
          token: 'POL',
          description: 'EVM-compatible network for cost-efficient everyday transactions.',
        },
        {
          id: 'bnb',
          name: 'BNB Chain',
          type: 'EVM',
          tps: 'Fast',
          avgFee: 'Low',
          finality: '~3 sec',
          token: 'BNB',
          description: 'Smart contract network with a broad ecosystem of applications.',
        },
        {
          id: 'solana',
          name: 'Solana',
          type: 'Non-EVM',
          tps: 'High',
          avgFee: 'Minimal',
          finality: '< 1 sec',
          token: 'SOL',
          description: 'High-throughput Layer 1 network with parallelized execution.',
        },
        {
          id: 'sui',
          name: 'Sui Network',
          type: 'Non-EVM',
          tps: 'High',
          avgFee: 'Minimal',
          finality: '< 1 sec',
          token: 'SUI',
          description: 'Move-powered Layer 1 network built for responsive settlement.',
        },
        {
          id: 'aptos',
          name: 'Aptos',
          type: 'Non-EVM',
          tps: 'High',
          avgFee: 'Minimal',
          finality: '< 1 sec',
          token: 'APT',
          description: 'Parallelized execution Layer 1 network engineered for performance.',
        },
      ],
    },
    principles: {
      kicker: 'Hybit Principles',
      title: 'Foundations we build upon.',
      subtitle:
        'Our three guiding commitments to make Hybit straightforward and dependable.',
      items: [
        {
          id: '1',
          name: 'Visual Clarity',
          role: 'Principle 01',
          company: 'Clean Design',
          avatar: '01',
          quote:
            'Balance information, value movement, and transaction actions are presented plainly without convoluted jargon.',
          metric: 'Structured and easy-to-read interface',
        },
        {
          id: '2',
          name: 'Effortless Transfers',
          role: 'Principle 02',
          company: 'Hybit ID',
          avatar: '02',
          quote:
            'Send and receive assets simply using your Hybit ID handle. Removes the stress of copying and pasting lengthy addresses.',
          metric: 'Confident transfers with your unique handle',
        },
        {
          id: '3',
          name: 'Information Transparency',
          role: 'Principle 03',
          company: 'Transparency',
          avatar: '03',
          quote:
            'Estimated network fees and transaction terms are displayed clearly before you choose to authorize them.',
          metric: 'No hidden surprises or ambiguous terms',
        },
      ],
    },
    faq: {
      kicker: 'Frequently Asked Questions',
      title: 'Common questions answered.',
      subtitle:
        'Clear details about how Hybit works, account management, and network support.',
      items: [
        {
          id: 'faq-1',
          question: 'What is Hybit ID?',
          answer:
            'Hybit ID is your unique personal handle for sending and receiving assets in the Hybit wallet. It replaces long hex wallet addresses so transfer details are easy to read and remember.',
        },
        {
          id: 'faq-2',
          question: 'How do I create a wallet in Hybit?',
          answer:
            'You simply register with an email address and activate a passkey on your device. Hybit pairs one email address directly to one personal wallet.',
        },
        {
          id: 'faq-3',
          question: 'Who controls wallet keys and assets?',
          answer:
            'You hold full authorization over transactions. Keys are safeguarded by dedicated, isolated encrypted infrastructure. Every send or swap requires your direct approval.',
        },
        {
          id: 'faq-4',
          question: 'What happens if I lose or replace my device?',
          answer:
            'You can restore account access using your registered verified email and set up a new passkey on your replacement device. Further recovery procedures will be announced closer to release.',
        },
        {
          id: 'faq-5',
          question: 'Which blockchains does Hybit support?',
          answer:
            'Hybit supports prominent networks including Ethereum, Base, Solana, Arbitrum, Optimism, Polygon, and BNB Chain. The final active lineup for initial launch will be announced closer to release.',
        },
        {
          id: 'faq-6',
          question: 'Are there fees when using Hybit?',
          answer:
            'Transactions incur only the standard network gas fees of the blockchain you are using. Fee estimates are always presented before you approve a transaction. Additional fee terms will be announced closer to release.',
        },
      ],
    },
    cta: {
      kicker: '1 Email, 1 Wallet · Hybit ID',
      title: 'Get started with Hybit.',
      subtitle:
        'Sign up with your email and claim your Hybit ID. Manage, send, and receive crypto assets right in your browser.',
      openHybit: 'Open Hybit',
      downloadApp: 'Download App',
      comingSoon: '· Coming Soon',
      guarantee1: '1 Email for 1 Wallet',
      guarantee2: 'Transfers with Hybit ID',
      guarantee3: 'Approval for Every Transaction',
    },
    footer: {
      description:
        'Crypto wallet with a clear, modern, and professional interface. Send and receive assets using Hybit ID, simply 1 email for 1 wallet.',
      version: 'Early Preview v1.0.0',
      productHeading: 'Product',
      guidesHeading: 'Guides',
      legalHeading: 'Legal & Trust',
      links: {
        product: [
          { label: 'Features', href: '#features' },
          { label: 'Preview', href: '#preview' },
          { label: 'Security', href: '#security' },
          { label: 'Networks', href: '#ecosystem' },
        ],
        guides: [
          { label: 'Documentation', href: '#' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Release Notes', href: '#' },
          { label: 'Download App', href: '#' },
        ],
        legal: [
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms of Service', href: '#' },
          { label: 'Security Principles', href: '#security' },
          { label: 'Information Disclosure', href: '#' },
        ],
      },
      copyright: `© ${new Date().getFullYear()} Hybit. All rights reserved.`,
      noticePlaceholder: 'Information page will be available closer to release.',
    },
    phoneMockup: {
      time: '09:41',
      hybitId: 'alex.hybit',
      saldoLabel: 'Balance',
      todayGain: '+$1,142.30 (+8.4%) Today',
      actions: {
        send: 'Send',
        receive: 'Receive',
        swap: 'Swap',
        buy: 'Buy',
        bridge: 'Bridge',
      },
      assetsHeading: 'Portfolio Assets',
      assetsSubheading: 'Assets held in your personal wallet',
      viewAll: 'View All',
      nav: {
        home: 'Dashboard',
        portfolio: 'Portfolio',
        swap: 'SWAP',
        history: 'History',
        settings: 'Settings',
      },
    },
    drawer: {
      navigationHeading: 'Navigation',
      appMobile: 'Mobile App',
      comingSoon: '· Coming Soon',
      connectWallet: 'Connect Wallet',
      disconnect: 'Disconnect',
      openHybit: 'Open Hybit',
      note1: '1 Email, 1 Wallet',
      note2: 'Early Preview v1.0.0',
    },
    connectModal: {
      title: 'Connect Wallet',
      subtitle: '1 Email, 1 Personal Wallet',
      recommendedBadge: 'Recommended',
      connectedBadge: 'Connected',
      footerNotice: 'Encrypted Key Infrastructure',
      options: [
        {
          id: 'privy',
          name: 'Privy Embedded Wallet',
          description: 'Sign in with Email & Device Passkey',
          badge: 'Recommended',
          recommended: true,
        },
        {
          id: 'metamask',
          name: 'MetaMask',
          description: 'Connect via browser extension or mobile app',
          badge: 'EVM',
        },
        {
          id: 'coinbase',
          name: 'Coinbase Smart Wallet',
          description: 'Connect with Coinbase passkey account',
          badge: 'Passkey',
        },
        {
          id: 'phantom',
          name: 'Phantom',
          description: 'Multi-chain Solana & Ethereum wallet',
          badge: 'Multi-Chain',
        },
        {
          id: 'walletconnect',
          name: 'WalletConnect',
          description: 'Scan QR code with supported crypto wallets',
          badge: 'Universal',
        },
      ],
    },
  },
};

export const useLandingTranslation = (): LandingDictionary => {
  const { language } = useAppSettings();
  return LANDING_TRANSLATIONS[language] || LANDING_TRANSLATIONS.id;
};

