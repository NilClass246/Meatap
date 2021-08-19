$(function () {
  new MainManager().init();
});
var MainManager = function () {
    aidn.util.useDummyDiv();
    function a() {
      (G = aidn.window.width()),
        (A = aidn.window.height()),
        I && (I.resize(G, A), g && g.resize());
    }
    function e(n, a) {
      (a = R.length + C.length), 1 == b && (n += C.length);
      var e = Math.round((n / a) * 100) + "%";
      a <= 0 && (e = "0%"), $("#scene_loading hr").css("width", e);
    }
    function t() {
      1 == ++b ? R.init(t, e) : 2 == b && i();
    }
    function i() {
      (x = 1),
      
        $("#scene_loading hr").css("display", "none"),
        $("#scene_loading hr").css("width", 0),
        $("#scene_loading").stop().fadeOut(200, "linear"),
        p
          ? ($("#scene_loading").stop().css("display", "none"),
            $("#bt_back").stop().css("display", "none"),
            B && $("#bt_fs").stop().css("display", "none"),
            $("#scene_main .set").stop().css("display", "none"))
          : $("#scene_main").stop().fadeIn(200, "linear"),
        (m = aidn.___waContext.currentTime),
        g.start(),
        C.start();
    }
    function n(n) {
      (U = !U)
        ? ($("#bt_feedback a").text("触摸反馈: 开启"),
          aidn.util.setCookie("fb", "on", 2592e3))
        : ($("#bt_feedback a").text("触摸反馈: 关闭"),
          aidn.util.setCookie("fb", "off", 2592e3)),
        n && n.preventDefault();
    }
    function o(n) {
      (T = !T)
        ? ($("#bt_backtrack a").text("背景音乐: 开启"),
          aidn.util.setCookie("bt", "on", 2592e3))
        : ($("#bt_backtrack a").text("背景音乐: 关闭"),
          aidn.util.setCookie("bt", "off", 2592e3)),
        n && n.preventDefault();
    }
    function r() {
      C.update(),
        1 == x && --D < 0 && v(),
        (function () {
          if (!p) return;
          if (1 != x) return;
          var n = 1e3 * (aidn.___waContext.currentTime - m);
          if (l * s < n) {
            var a = Math.floor(n / s) + 1;
            h += a - l;
            var e = (l = a) * s - n;
            if (0 <= e) {
              var t = Math.random(),
                i = 1;
              192 <= h
                ? (h = 0)
                : 128 <= h
                ? (t < 0.7 && (i = 2), t < 0.5 && (i = 3))
                : 64 <= h
                ? (t < 0.35 && (i = 2), t < 0.2 && (i = 3), t < 0.02 && (i = 0))
                : 32 <= h
                ? (t < 0.35 && (i = 2), t < 0.24 && (i = 0))
                : 0 <= h && t < 0.4 && (i = 0);
              for (var o = 0; o < i; o++)
                (d = c[f]),
                  32 <= ++f && ((f = 0), aidn.util.shuffleArray(c)),
                  g.changeId(d, 0, !0);
            }
          }
        })(),
        I.render(z),
        window.requestAnimFrame(r);
    }
    this.init = function () {
      !(function () {
        aidn.util.setCookie("MusicNumber", "0", 2592e3);
        aidn.window.addDummyDiv();
        try {
          aidn.adv.show();
        } catch (n) {}
        var n = 1;
        2 <= window.devicePixelRatio && (n = 2);
        ((I = PIXI.autoDetectRenderer(G, A, {
          backgroundColor: 0x7dcce1,
          antialias: !1,
          resolution: n,
        })).autoDensity = !0),
          document.getElementById("view").appendChild(I.view),
          (z = new PIXI.Container()),
          g.init(),
          a(),
          $("#scene_top").fadeIn(300),
          r();
      })();
    };
    for (
      var l = 0,
        s = 6e4 / 280,
        d = Math.floor(32 * Math.random()),
        h = 0,
        c = [],
        f = 0,
        u = 0;
      u < 32;
      u++
    )
      c[u] = u;
    function v() {
      p ||
        S ||
        ((S = !0),
        $("#bt_back").stop().fadeIn(200, "linear"),
        B && $("#bt_fs").stop().fadeIn(200, "linear"),
        $("#scene_main .set").stop().fadeIn(200, "linear"));
    }
    var p = !1;
    1 == aidn.util.getQuery().auto && (p = !0), aidn.util.needExpandArea(!0);
    var B = aidn.util.enabledFullscreen();
    B &&
      ($("#bt_fs").css("display", "block"),
      $("#bt_fs").click(function (n) {
        aidn.util.fullscreen();
      })),
      $("#bt_start a").click(function (n) {
        $("#bt_back").text("＜返回");
        $("#scene_info").stop().fadeOut(200, "linear"),
        $("#scene_top").stop().fadeOut(200, "linear"),
          $("#scene_loading").stop().fadeIn(200, "linear"),
          2 == b ? i() : (new aidn.WebAudio().load(""), C.init(t, e));
        try {
          aidn.adv.hide();
        } catch (n) {}
        n.preventDefault();
      }),
      $("#bt_about a").click(function (n) {
        $("#about").stop().fadeIn(200, "linear"),
          $("#about_cover").stop().fadeIn(200, "linear"),
          n.preventDefault();
      }),
      $("#bt_option a").click(function (n) {
        $("#option").stop().fadeIn(200, "linear"),
          $("#option_cover").stop().fadeIn(200, "linear"),
          n.preventDefault();
      }),
      $("#bt_close,#about_cover,#option_cover").click(function () {
        $("#about").stop().fadeOut(200, "linear"),
          $("#about_cover").stop().fadeOut(200, "linear");
        $("#option").stop().fadeOut(200, "linear"),
          $("#option_cover").stop().fadeOut(200, "linear");
      }),
      $("#bt_back").click(function () {
        switch (x) {
          case 1:
            x = 0;
            try {
              aidn.adv.show();
            } catch (n) {}
            g.end(),
              C.end(),
              $('#bt_back').text("＜返回");
              $("#scene_top").stop().fadeIn(100, "linear"),
              $("#scene_loading").stop().fadeOut(100, "linear"),
              $("#scene_main").stop().fadeOut(100, "linear"),
              $("#scene_info").stop().fadeIn(100, "linear"),
              v();
            break;
          default:
            location.href = "http://meagames.cn/";
        }
      }),
      //bgm选择
      $("#bt_bgm_1").click(function(n){
        $("#select_bgm_1").css("display", "inline-block");
        $("#select_bgm_2").css("display", "none");
        $("#select_bgm_3").css("display", "none");
        aidn.util.setCookie("MusicNumber", "0", 2592e3);
        n.preventDefault();
      }),
      $("#bt_bgm_2").click(function(n){
        $("#select_bgm_1").css("display", "none");
        $("#select_bgm_2").css("display", "inline-block");
        $("#select_bgm_3").css("display", "none");
        aidn.util.setCookie("MusicNumber", "1", 2592e3);
        n.preventDefault();
      }),
      $("#bt_bgm_3").click(function(n){
        $("#select_bgm_1").css("display", "none");
        $("#select_bgm_2").css("display", "none");
        $("#select_bgm_3").css("display", "inline-block");
        aidn.util.setCookie("MusicNumber", "2", 2592e3);
        n.preventDefault();
      }),
      $("#bt_feedback a").click(n),
      $("#bt_backtrack a").click(o);
    var G,
      A,
      y = aidn.util.checkJapanese(),
      E = aidn.util.checkMobile(),
      w = "https://aidn.jp/mikutap/",
      M = "Mikutap";
    (M += y ? ",初音未来10周年" : ",Miku10th"),
      $("#bt_tw").click(function (n) {
        var a = document.title;
        aidn.social.shareTw(w, !0, a, "daniwell_aidn", M);
      }),
      $("#bt_fb").click(function (n) {
        aidn.social.shareFb(w, !0);
      }),
      $("#bt_gp").click(function (n) {
        aidn.social.shareGp(w, !0);
      });
    var m,
      I,
      z,
      b = 0,
      x = 0,
      C = new (function () {
        function t() {
          c && c();
        }
        function i(n, a) {
          f && f(n, a);
        }
        var r;
        (this.init = function (n, a) {
          (f = a),
            (function (n) {
              c = n;
              for (var a = [], e = 0; e < o; e++) a[e] = [e + ".mp3"];
              (r = new WebAudioManager()).load(
                "data/track/track.json",
                a,
                t,
                i
              );
            })(n);
        }),
          (this.update = function () {
            !(function () {
              if(T){
                if (l) {
                  //持续时间
                  MusicNumber = Number(aidn.util.getCookie("MusicNumber"));
                  var duration = 0;
                  if(MusicNumber == 0){
                    duration = 14.24;
                  }else if(MusicNumber == 1){
                    duration = 54.89;
                  }else if(MusicNumber ==2){
                    duration = 13.25;
                  }
                  if (curTime>=duration) {
                    oldTime = aidn.___waContext.currentTime;
                    var o = d[0][MusicNumber];
                    0 <= o && r.play(o, 0, 0.5);
                  }
                  curTime = aidn.___waContext.currentTime - oldTime
                }
              }else{
                curTime = 99;
                r.stopAll();
              }
            })();
          }),
          (this.start = function () {
            curTime = 999;
            oldTime = aidn.___waContext.currentTime;
            (l = !0), (v = 0);
          });
        this.end = function () {
          (l = !1), (v = 0);
          r.stopAll();
        };
        var oldTime = 0;
        var curTime = 999;
        var l = !1,
          o = 11;
        this.length = o;
        for (var s = [], n = 0; n < o; n++) s[n] = 1.2;
        s[1] *= 0.6;
        var d = [[0, 1, 2],[]],
          a = "";
        (a += "3443443443443434"),
          (a += "5665665665665656"),
          (a += "7887887887887878");
        var e = (a += "9119119119119191").length;
        for (n = 0; n < e; n++) {
          var h = parseInt(a.charAt(n));
          1 == h && (h = 10), (d[1][n] = h), 4 <= n && (d[0][n] = d[0][n % 4]);
        }
        var c,
          f,
          u = d[0].length,
          v = 0,
          p = 6e4 / 280;
      })(),
      R = new (function () {
        var o,
          r = -1,
          l = -1;
        function t() {
          c && c();
        }
        function i(n, a) {
          e && e(n, a);
        }
        this.init = function (n, a) {
          (e = a),
            (function (n) {
              c = n;
              for (var a = [], e = 0; e < s; e++) a[e] = [e + ".mp3"];
              (o = new WebAudioManager()).load("data/main/main.json", a, t, i);
            })(n);
        };
        this.play = function (n, a) {
          MusicNumber = Number(aidn.util.getCookie("MusicNumber"));
          if(MusicNumber == 0){
            f = 6e4 / 135;
          }else if(MusicNumber == 1){
            f = 6e4 / 140;
          }else if(MusicNumber ==2){
            f = 6e4 / 145;
          }
          var e = 1e3 * (aidn.___waContext.currentTime + h[n] - m),
            t = Math.floor(e / f);
          t == r && 0 <= l && o.stop(l), (r = t), (l = n);
          var i = f - (e % f);
          
          o.play(n, i / 1e3, 1.2);
        };
        var s = 32;
        this.length = s;
        for (var d = [], h = [], n = 0; n < s; n++) (d[n] = 1), (h[n] = 0.05);
        for (
          h[6] = 0.08,
            h[20] = 0.1,
            h[23] = 0.1,
            d[1] = 1.3,
            d[2] = 1.6,
            d[3] = 1.35,
            d[5] = 1.7,
            d[9] = 0.8,
            d[17] = 0.8,
            d[22] = 0.9,
            d[25] = 0.7,
            d[29] = 1.2,
            n = 0;
          n < s;
          n++
        )
          d[n] *= 1.2;
        var c,
          e,
          f = 6e4 / 135;
      })(),
      g = new (function () {
        //==========================================================
        //环形出现然后随机消失的圆形
        var s = function (n, a) {
            (this.id = n),
              (this.setPosition = function (n, a) {
                (r.position.x = e = n), (r.position.y = t = a);
              }),
              (this.setSize = function (n, a) {
                (i = n),
                  (o = a),
                  r.clear(),
                  r.beginFill(16777215),
                  (r.alpha = 0),
                  r.drawRect(0, 0, i, o);
              }),
              (this.play = function () {
                U &&
                  gsap.fromTo(
                    r,
                    0.5,
                    { alpha: 0.7 },
                    { alpha: 0, ease: Power0.easeNon }
                  );
              }),
              (this.hitcheck = function (n, a) {
                return e <= n && n < e + i && t <= a && a < t + o;
              });
            var e = 0,
              t = 0,
              i = 0,
              o = 0,
              r = new PIXI.Graphics();
            (r.interactive = !0), a.addChild(r);
          },
          //==========================================================
          //背景
          n = function (n) {
            function a() {
              o.clear(), o.beginFill(16777215), o.drawRect(0, 0, G, A);
            }
            function e() {
              t.resize();
            }
            (this.resize = function () {
              o.clear(), o.beginFill(i), o.drawRect(0, 0, G, A);
            }),
              (this.flash = function () {
                r.setChildIndex(o, r.children.length - 1);
                for (var n = 0; n < 3; n += 2)
                  gsap.delayedCall(0.07 * n, a),
                    gsap.delayedCall(0.07 * (n + 1), e);
              }),
              (this.setColor = function (n, a) {
                (i = n),
                  (a = 0 <= a ? a : 0),
                  r.setChildIndex(o, a),
                  t.resize();
              });
            var t = this,
              i = 16777215,
              o = new PIXI.Graphics(),
              r = n;
            r.addChild(o);
          },
          //==========================================================
          //绘制实心圆形（内部方法）
          d = function (n, a) {
            function e() {
              var n,
                a,
                e,
                t = 1.3 * d;
              if ((f.clear(), f.beginFill(0), f.moveTo(0, 0), 0 == o))
                for (var i = 0; i < c.rotation; i += 30)
                  (n = ((s * i + l) * Math.PI) / 180),
                    (a = Math.cos(n) * t),
                    (e = Math.sin(n) * t),
                    f.lineTo(a, e);
              else
                for (i = 360; c.rotation < i; i -= 30)
                  (n = ((s * i + l) * Math.PI) / 180),
                    (a = Math.cos(n) * t),
                    (e = Math.sin(n) * t),
                    f.lineTo(a, e);
              (n = ((s * c.rotation + l) * Math.PI) / 180),
                (a = Math.cos(n) * t),
                (e = Math.sin(n) * t),
                f.lineTo(a, e),
                f.lineTo(0, 0),
                f.endFill();
            }
            function t() {
              (o = 1),
                gsap.fromTo(
                  c,
                  0.9,
                  { rotation: 0 },
                  {
                    rotation: 360,
                    ease: Power1.easeOut,
                    onUpdate: e,
                    onComplete: i,
                  }
                );
            }
            function i() {
              r && r();
            }
            this.play = function (n, a) {
              //n=100;
              (o = 0),
                (d = n),
                (r = a),
                (l = 360 * Math.random()),
                (s = 1),
                Math.random() < 0.5 && (s = -1),
                f.clear(),
                f.beginFill(0),
                f.moveTo(0, 0),
                f.lineTo(1, 1),
                f.endFill(),
                gsap.fromTo(
                  c,
                  0.6,
                  { rotation: 0 },
                  {
                    rotation: 360,
                    ease: Power1.easeOut,
                    onUpdate: e,
                    onComplete: t,
                  }
                );
            };
            var o,
              r,
              l,
              s,
              d,
              h = n,
              c = { rotation: 0 },
              f = new PIXI.Graphics();
            h.addChild(f), (a.mask = f);
          },
          //==========================================================
          //变形
          r = function (n) {
            function h() {
              w.clear(), 0 == f ? w.lineStyle(v, u) : w.beginFill(u);
              for (var n = 0; n < p; n++) {
                var a = M["p" + n].x,
                  e = M["p" + n].y;
                0 == n ? w.moveTo(a, e) : w.lineTo(a, e);
              }
              (a = M.p0.x), (e = M.p0.y), w.lineTo(a, e);
            }
            function c() {
              (w.visible = !1), e && e();
            }
            this.play = function (n, a) {
              (f = n),
                (e = a),
                (function () {
                  y.setChildIndex(w, y.children.length - 1),
                    (w.visible = !0),
                    (w.x = G / 2),
                    (w.y = A / 2),
                    (u = L());
                  var n,
                    a = Math.min(G, A) * (0.32 * Math.random() + 0.16),
                    e = Math.floor(5 * Math.random()) + 3;
                  (p = e),
                    (v = 5 * Math.random() + 3),
                    w.clear(),
                    (w.rotation = 30 * Math.floor(6 * Math.random())),
                    (M = {}),
                    (n = 0 == f ? 3 : 2.5);
                  for (var t = 360 / p, i = 0; i < p; i++) {
                    var o = (i * t * Math.PI) / 180,
                      r = a * Math.cos(o),
                      l = a * Math.sin(o),
                      s = r + a * (Math.random() - 0.5) * n,
                      d = l + a * (Math.random() - 0.5) * n;
                    (M["p" + i] = { x: r, y: l }),
                      gsap.to(M["p" + i], 0.6, { x: s, y: d });
                  }
                  (M.progress = 0),
                    gsap.to(M, 0.8, {
                      progress: 1,
                      onUpdate: h,
                      onComplete: c,
                    });
                })();
            };
            var e,
              f,
              u,
              v,
              p,
              y = n,
              w = new PIXI.Graphics();
            y.addChild(w);
            var M = {};
          },
          //==========================================================
          //方形条纹（内部方法）
          t = function (n, a) {
            var f = function (n) {
              function i() {
                v.clear(),
                  v.lineStyle(d, h),
                  v.moveTo(s.x, s.y),
                  0 == u ? v.lineTo(r.x, r.y) : v.lineTo(l.x, l.y);
              }
              function o() {
                0 == u
                  ? ((u = 1),
                    (s = { x: r.x, y: r.y }),
                    gsap.to(s, f, {
                      x: l.x,
                      y: l.y,
                      ease: Power1.easeOut,
                      onUpdate: i,
                      onComplete: o,
                    }))
                  : (v.clear(), (v.visible = !1));
              }
              this.play = function (n, a, e, t) {
                return (
                  (v.visible = !0),
                  (u = 0),
                  (r = n),
                  (l = a),
                  (d = e),
                  (h = t),
                  (c = 0.2 * Math.random() + 0.2),
                  (f = 0.2 * Math.random() + 0.2),
                  (s = { x: r.x, y: r.y }),
                  gsap.to(s, c, {
                    x: l.x,
                    y: l.y,
                    ease: Power1.easeOut,
                    onUpdate: i,
                    onComplete: o,
                  }),
                  c + f
                );
              };
              var r,
                l,
                s,
                d,
                h,
                c,
                f,
                u,
                a = n,
                v = new PIXI.Graphics();
              a.addChild(v);
            };
            function u() {
              (y.visible = !1), 0 <= v.id && C[v.id].push(v), e && e();
            }
            this.play = function (n) {
              (e = n),
                (function () {
                  p.setChildIndex(y, p.children.length - 1),
                    (y.visible = !0),
                    (y.x = G / 2),
                    (y.y = A / 2),
                    (y.rotation =
                      0.5 * Math.PI * Math.floor(4 * Math.random()));
                  for (
                    var n,
                      a = Math.floor(7 * Math.random() + 2),
                      e =  Math.max(G, A),
                      t = ((v.size = e) / a) * (0.4 * Math.random() + 0.7),
                      i = (e / a) * (0.4 * Math.random() + 0.1),
                      o = L(),
                      r = 0,
                      l = 0;
                    l <= a;
                    l++
                  ) {
                    var s = (l - 0.5 * a) * t,
                      d = { x: -e / 2, y: s },
                      h = { x: e / 2, y: s },
                      c = (n = w[l] ? w[l] : new f(y)).play(d, h, i, o);
                    r < c && (r = c), (w[l] = n);
                  }
                  gsap.delayedCall(r, u);
                })();
            };
            var v = this,
              p = n;
            this.id = a;
            var e,
              y = new PIXI.Container(),
              w = [];
            (this.size = 0), (this.container = y), p.addChild(y);
          };
          //==========================================================
        function l(n, a) {
          for (var e = M.length, t = 0; t < e; t++) {
            var i = M[t];
            if (i.hitcheck(n, a)) return u != i.id && i.play(), i.id;
          }
          return !1;
        }
        //==========================================================
        function a(n) {
          c(
            65 <= n.keyCode
              ? n.keyCode - 55
              : 48 <= n.keyCode
              ? n.keyCode - 48
              : n.keyCode
          );
        }
        //==========================================================
        function e(n) {
          c(-1);
        }
        //==========================================================
        var cot = 0;
        function i(n) {
            y = !0;
            var a = aidn.event.getPos(n),
              e = l(a.x, a.y);
            if ((c(e), n.originalEvent && n.originalEvent.touches))
              for (var t = n.originalEvent.touches.length, i = 1; i < t; i++) {
                var o = n.originalEvent.touches[i];
                c((e = l(o.pageX, o.pageY)), 1);
              }
        }
        //==========================================================
        function o(n) {
          if (y) {
            var a = aidn.event.getPos(n);
            c(l(a.x, a.y), 0, !0);
          }
          n.preventDefault();
        }
        //==========================================================
        function h(n) {
          y && (c(-1), (y = !1));
        }
        //==========================================================
        //按压提起：u的定义
        function c(n, a, e) {
          var t, i;
          u != n &&
            (1 != a && (u = n),
            u < 0 ||
              (R.play(n % R.length, e),
              (D = 90),
              S &&
                ((S = !1),
                $("#bt_back").stop().fadeOut(200, "linear"),
                B && $("#bt_fs").stop().fadeOut(200, "linear"),
                $("#scene_main .set").stop().fadeOut(200, "linear")),
              --x <= 0 &&
                ((i = (t = Math.floor(I.length * Math.random())) + m.length),
                (C[i].length ? C[i].pop() : new I[t](b, i)).play(),
                (x = 12 * Math.random() + 6)),
              (t = n % m.length),
              (0 < C[t].length ? C[t].pop() : new m[t](b, t)).play()));
        }
        //==========================================================
        (this.resize = function () {
          if (w) {
            var n = 0,
              a = v,
              e = p;
            A < G && ((a = p), (e = v));
            for (var t = G / a, i = A / e, o = 0; o < e; o++)
              for (var r = 0; r < a; r++) {
                var l;
                M[n] ? (l = M[n]) : ((l = new s(n, f)), (M[n] = l)),
                  l.setPosition(t * r, i * o),
                  l.setSize(t, i),
                  n++;
              }
            T.resize();
          }
        }),
        //==========================================================
          (this.init = function () {
            (w = !0),
              (b = new PIXI.Container()),
              z.addChild(b),
              (f = new PIXI.Container()),
              z.addChild(f),
              (T = new n(b)).setColor(0x7dcce1, 0);
          }),
          //==========================================================
          //绑定点击事件和方法
          (this.start = function () {
            E ||
              ($("#view").on("mousedown", i),
              $(window).on("mousemove", o),
              $(window).on("mouseup", h),
              $(window).on("keydown", a),
              $(window).on("keyup", e)),
              (E || window.TouchEvent) &&
                ($("#view").on("touchstart", i),
                $(window).on("touchmove", o),
                $(window).on("touchend", h)),
              $("#view").css("cursor", "pointer");
          }),
          //==========================================================
          (this.end = function () {
            E ||
              ($("#view").off("mousedown", i),
              $(window).off("mousemove", o),
              $(window).off("mouseup", h),
              $(window).off("keydown", a),
              $(window).off("keyup", e)),
              (E || window.TouchEvent) &&
                ($("#view").off("touchstart", i),
                $(window).off("touchmove", o),
                $(window).off("touchend", h)),
              $("#view").css("cursor", "auto");
          }),
          //==========================================================
          (this.changeId = function (n, a, e) {
            c(n, a, e);
          });
          //==========================================================
        var f,
          u = -1,
          v = 4,
          p = 8,
          y = !1,
          w = !1,
          M = [],
          m = [
            //==========================================================
            //动画定义开始
            //圆形爆发 #1
            function (n, a) {
              var s = function (n) {
                function l() {
                  s.visible = !1;
                }
                this.play = function (n, a, e) {
                  (s.visible = !0), s.clear();
                  var isUp = Math.round(Math.random()) == 0;
                  if(isUp){
                    var t = G * Math.random();
                    var i = A * Math.round(Math.random());
                  }else{
                    var t = G * Math.round(Math.random());
                    var i = A * Math.random();
                  }
                  //var t = G * Math.random(),
                    //i = A * Math.random(),
                  var o = Math.min(G, A) * (0.2*Math.random() + 0.02);
                  var deg = 2*Math.PI*Math.random();
                  //var rx = radius*Math.sin(deg)+n;
                  //var ry = radius*Math.cos(deg)+a;
                  s.lineStyle(3 * Math.random() + 3, e),
                  s.beginFill(e),
                    s.drawCircle(0, 0, o),
                    s.endFill(),
                    (s.x = t),
                    (s.y = i),
                    (s.scale.x = 0),
                    (s.scale.y = 0),
                    (s.rotation = Math.random() * Math.PI);
                  var r = 0.1 * Math.random() + 0.4;
                  return (
                    gsap.to(s, r, {
                      x: t,
                      y: i,
                      rotation: Math.random() * Math.PI,
                      ease: Power3.easeOut,
                      onComplete: l,
                    }),
                    gsap.to(s.scale, r, {
                      x: 1,
                      y: 1,
                      ease: Back.easeOut.config(1.7),
                    }),
                    r
                  );
                };
                var a = n,
                  s = new PIXI.Graphics();
                a.addChild(s);
              };
              function d() {
                (f.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  h.setChildIndex(f, h.children.length - 1), (f.visible = !0);
                  for (
                    var n = 5 * Math.random() + 7,
                      a = 0,
                      e = G / 2,
                      t = A / 2,
                      i = L(),
                      o = 0;
                    o < n;
                    o++
                  ) {
                    var r;
                    r = c[o] ? c[o] : new s(f);
                    var l = (c[o] = r).play(e, t, i);
                    a < l && (a = l);
                  }
                  gsap.delayedCall(a, d);
                })();
              };
              var radius = Math.min(G,A)*Math.random();
              var e = this,
                h = n;
              this.id = a;
              var c = [],
                f = new PIXI.Container();
              h.addChild(f);
            },
            //==========================================================
            //方形爆发 #2
            function (n, a) {
              var s = function (n) {
                function l() {
                  s.visible = !1;
                }
                this.play = function (n, a, e, direction) {
                  (s.visible = !0), s.clear();
                  if(direction==1){
                    var t = G * Math.random();
                    n = t;
                    var i = A;
                    a = 0;
                  }else if(direction==2){
                    var t = G;
                    n = 0;
                    var i = A * Math.random();
                    a = i;
                  }else if(direction==3){
                    var t = G * Math.random();
                    n = t;
                    var i = 0;
                    a = A;
                  }
                  else if(direction==4){
                    var t = 0;
                    n = G;
                    var i = A * Math.random();
                    a = i;
                  }
                  //var t = G * Math.random(),
                    //i = A * Math.random(),
                  var o = Math.min(G, A) * (0.1 * Math.random() + 0.1);
                  s.beginFill(e),
                    s.drawRect(-o / 2, -o / 2, o, o),
                    (s.x = n),
                    (s.y = a),
                    (s.scale.x = 0),
                    (s.scale.y = 0),
                    (s.rotation = Math.random() * Math.PI);
                  var r = 0.2 * Math.random() + 0.7;
                  return (
                    gsap.to(s, r, {
                      x: t, 
                      y: i,
                      rotation: Math.random() * Math.PI,
                      ease: Bounce.easeOut,
                      onComplete: l,
                    }),
                    gsap.to(s.scale, r, {
                      x: 1,
                      y: 1,
                      ease: Back.easeOut.config(1.7),
                    }),
                    r
                  );
                };
                var a = n,
                  s = new PIXI.Graphics();
                a.addChild(s);
              };
              function d() {
                (f.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  h.setChildIndex(f, h.children.length - 1), (f.visible = !0);
                  for (
                    var n = 5 * Math.random() + 7,
                      a = 0,
                      e = G / 2,
                      t = A / 2,
                      i = L(),
                      direction = Math.floor(Math.random()*5),
                      o = 0;
                    o < n;
                    o++
                  ) {
                    var r;
                    r = c[o] ? c[o] : new s(f);
                    var l = (c[o] = r).play(e, t, i, direction);
                    a < l && (a = l);
                  }
                  gsap.delayedCall(a, d);
                })();
              };
              var e = this,
                h = n;
              this.id = a;
              var c = [],
                f = new PIXI.Container();
              h.addChild(f);
            },
            //==========================================================
            //螺旋圆形 #3
            function (n, a) {
              var h = function (n) {
                function r() {
                  h.beginFill(l),
                    h.drawCircle(0, 0, s),
                    (h.scale.x = 0),
                    (h.scale.y = 0),
                    gsap.to(h.scale, 0.5, {
                      x: 1,
                      y: 1,
                      ease: Elastic.easeOut.config(1, 0.3),
                      onComplete: a,
                    });
                }
                function a() {
                  gsap.to(h.scale, 0.4, {
                    x: 0,
                    y: 0,
                    ease: Power2.easeOut,
                    onComplete: e,
                    delay: 0.1,
                  });
                }
                function e() {
                  (h.visible = !1), d && d();
                }
                this.play = function (n, a, e, t, i, o) {
                  (h.visible = !0),
                    h.clear(),
                    (h.x = 0),
                    (h.y = 0),
                    (l = a),
                    (s = e),
                    (d = o),
                    gsap.delayedCall(n, r);
                    gsap.to(h, 1, {
                      x: t,
                      y: i,
                      ease: Power0.easeOut,
                    });
                };
                var l,
                  s,
                  d,
                  t = n,
                  h = new PIXI.Graphics();
                t.addChild(h);
              };
              function c() {
                (v.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  f.setChildIndex(v, f.children.length - 1),
                    (v.visible = !0),
                    (v.x = G / 2),
                    (v.y = A / 2),
                    (v.rotation = Math.random() * Math.PI +Math.PI);
                  for (
                    var n = 10,
                      a = L(),
                      e = (Math.min(G, A) / 64) * (2 * Math.random() + 3),
                      t = 2,
                      i = 0;
                    i < 40;
                    i++
                  ) {
                    var o,
                      r = (25 * i * Math.PI) / 180,
                      l = n * Math.cos(r),
                      s = n * Math.sin(r);
                    (n += e),
                      (t += 0.5),
                      (o = u[i] ? u[i] : new h(v)),
                      (u[i] = o);
                    var d = null;
                    39 == i && (d = c), o.play(0.01 * i, a, t, l, s, d);
                  }
                })();
              };
              var e = this,
                f = n;
              this.id = a;
              var u = [],
                v = new PIXI.Container();
              f.addChild(v);
            },
            //==========================================================
            //实心多边形扭曲 #4
            function (n, a) {
              var i = function (n) {
                function e() {
                  var n = Math.min(G, A) * (0.1 * Math.random() + 0.1);
                  l.beginFill(L()),
                    l.drawCircle(0, 0, n),
                    (l.x = i),
                    (l.y = o),
                    (l.scale.x = 1),
                    (l.scale.y = 0),
                    gsap.to(l.scale, 0.3, {
                      x: 1,
                      y: 1,
                      ease: Elastic.easeOut.config(1, 0.3),
                      onComplete: a,
                    });
                }
                function a() {
                  gsap.to(l.scale, 0.3, {
                    x: 1,
                    y: 0,
                    ease: Back.easeIn.config(1.7),
                    onComplete: t,
                    delay: 0.2,
                  });
                }
                function t() {
                  l.visible = !1;
                }
                this.play = function (n, a) {
                  (l.visible = !0),
                    l.clear(),
                    (i = G*Math.random()),
                    (o = A*Math.random()),
                    gsap.delayedCall(n, e);
                };
                var i,
                  o,
                  r = n,
                  l = new PIXI.Graphics();
                r.addChild(l);
              };
              function o() {
                (l.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  r.setChildIndex(l, r.children.length - 1), (l.visible = !0);
                  for (
                    var n = 1, a = 0;
                    a < n;
                    a++
                  ) {
                    var e;
                    (e = s[a] ? s[a] : new i(l)), (s[a] = e);
                    var t = null;
                    a == n - 1 && (t = o), e.play(0.06*a, t);
                  }
                })();
              };
              var e = this,
                r = n;
              this.id = a;
              var l = new PIXI.Container();
              r.addChild(l);
              var s = [];
            },
            //==========================================================
            //空心多边形扭曲 #5
            function (n, a) {
              var i = function (n) {
                function e() {

                  var n = Math.min(G, A);
                  var a = n * (0.08 * Math.random() + 0.05);
                  l.lineStyle(4 * Math.random() + 4, L()),
                    l.drawRect(-a / 2, -a / 2, a, a),
                    (l.scale.x = 0),
                    (l.scale.y = 0),
                    (l.rotation = Math.random() * Math.PI);
                    l.x = G/2;
                    l.y = A/2;
                    gsap.to(
                      l, 0.5, {
                        rotation: 0,
                        ease: Power1.easeOut,
                      }
                    )
                    gsap.to(l.scale, 0.5, {
                      x: 1,
                      y: 1,
                      ease: Power1.easeOut,
                      onComplete: t
                    });
                    gsap.to(
                      l, 1, {
                        x: o,
                        y: r,
                        ease: Power1.easeOut,
                      }
                    )

                }
                function t() {
                  var n = Math.min(G, A),
                    a = o + (n / 2) * (Math.random() - 0.5),
                    e = r + (n / 2) * (Math.random() - 0.5);
                  gsap.to(l, 0.5, {
                    rotation: -Math.random() * Math.PI,
                    ease: Power1.easeIn,
                    onComplete: i,
                  }),
                    gsap.to(l.scale, 0.5, {
                      x: 0,
                      y: 0,
                      ease: Power1.easeIn,
                    });
                }
                function i() {
                  l.visible = !1;
                }
                this.play = function (n, a) {
                  (l.visible = !0),
                    l.clear();
                    if(side==0){
                      o= G*Math.random();
                      r= 0;
                    }else if(side ==1){
                      o=0;
                      r= A*Math.random();
                    }else if(side == 2){
                      o = G*Math.random();
                      r = A;
                    }else if(side == 3){
                      o = G;
                      r = A*Math.random();
                    };
                    gsap.delayedCall(n, e);
                };
                var side = Math.floor(Math.random()*4);
                var o,
                  r,
                  a = n,
                  l = new PIXI.Graphics();
                a.addChild(l);
              };
              function o() {
                (l.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  direction = Math.round(Math.random());
                  originPlace = Math.floor(Math.random()*4);
                  r.setChildIndex(l, r.children.length - 1), (l.visible = !0);
                  for (
                    var n = Math.floor(5 * Math.random() + 10), a = 0;
                    a < n;
                    a++
                  ) {
                    var e;
                    (e = s[a] ? s[a] : new i(l)), (s[a] = e);
                    var t = null;
                    a == n - 1 && (t = o), e.play(0.06 * a, t);
                  }
                })();
              };
              var direction, originPlace;
              var e = this,
                r = n;
              this.id = a;
              var l = new PIXI.Container();
              r.addChild(l);
              var s = [];
            },
            //==========================================================
            //绘制多边形 #6
            function (n, a) {
              function h() {
                (f.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  c.setChildIndex(f, c.children.length - 1),
                    (f.visible = !0),
                    (f.x = G / 2),
                    (f.y = A / 2);
                  var n = L(),
                    a = Math.min(G, A) * (0.28 * Math.random() + 0.2),
                    e = Math.floor(5 * Math.random()) + 3;
                  u.clear(),
                    u.lineStyle(7 * Math.random() + 4, n, 1),
                    (u.rotation = 30 * Math.floor(6 * Math.random()));
                  for (var t = 360 / e, i = 0; i <= e; i++) {
                    var o = (i * t * Math.PI) / 180,
                      r = a * Math.cos(o),
                      l = a * Math.sin(o);
                    0 == i ? u.moveTo(r, l) : u.lineTo(r, l);
                  }
                  var s = 0.8 * Math.random() + 0.4,
                    d = 0.8 * Math.random() + 0.4;
                  gsap.fromTo(
                    u.scale,
                    0.9,
                    { x: s, y: s },
                    { x: d, y: d, ease: Bounce.easeOut }
                  ),
                    v.play(a, h);
                })();
              };
              var e = this,
                c = n;
              this.id = a;
              var f = new PIXI.Container(),
                u = new PIXI.Graphics();
              c.addChild(f), f.addChild(u);
              var v = new d(f, u);
            },
            //==========================================================
            //随机出现的方形 #7
            function (n, a) {
              var i = function (n) {
                function e() {

                  var n = Math.min(G, A);
                  var a = n * (0.08 * Math.random() + 0.05);
                  l.lineStyle(4 * Math.random() + 4, L()),
                    l.drawRect(-a / 2, -a / 2, a, a),
                    (l.scale.x = 0),
                    (l.scale.y = 0),
                    (l.rotation = Math.random() * Math.PI);
                    gsap.to(l.scale, 0.5, {
                      x: 1,
                      y: 1,
                      ease: Power1.easeOut,
                    });
                    switch(originPlace){
                      case 0:
                        l.x = 0;
                        l.y = 0;
                        if(direction ==0){
                          gsap.to(l, 1, {
                            x: G,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            y: A/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }else{
                          gsap.to(l, 1, {
                            y: A,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            x: G/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }
                        break;
                      case 1:
                        l.x = 0;
                        l.y = A;
                        if(direction ==0){
                          gsap.to(l, 1, {
                            x: G,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            y: A/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }else{
                          gsap.to(l, 1, {
                            y: 0,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            x: G/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }
                        break;
                      case 2:
                        l.x = G;
                        l.y = A;
                        if(direction ==0){
                          gsap.to(l, 1, {
                            x: 0,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            y: A/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }else{
                          gsap.to(l, 1, {
                            y: 0,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            x: G/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }
                        break;
                      case 3:
                        l.x = G;
                        l.y = 0;
                        if(direction ==0){
                          gsap.to(l, 1, {
                            x: 0,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            y: A/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }else{
                          gsap.to(l, 1, {
                            y: A,
                            ease: Power0.easeOut,
                          });
                          gsap.to(l, 0.5, {
                            x: G/2 ,
                            rotation: 0,
                            ease: Power1.easeOut,
                            onComplete: t,
                          });
                        }
                        break;
                    }

                }
                function t() {
                  var n = Math.min(G, A),
                    a = o + (n / 2) * (Math.random() - 0.5),
                    e = r + (n / 2) * (Math.random() - 0.5);
                    switch(originPlace){
                      case 0:
                        if(direction ==0){
                          gsap.to(l, 0.5, {
                            y: 0 ,
                            ease: Power1.easeIn,
                          });
                        }else{
                          gsap.to(l, 0.5, {
                            x: 0 ,
                            ease: Power1.easeIn,
                          });
                        }
                        break;
                      case 1:
                        if(direction ==0){
                          gsap.to(l, 0.5, {
                            y: A ,
                            ease: Power1.easeIn,
                          });
                        }else{
                          gsap.to(l, 0.5, {
                            x: 0 ,
                            ease: Power1.easeIn,
                          });
                        }
                        break;
                      case 2:
                        if(direction ==0){
                          gsap.to(l, 0.5, {
                            y: A ,
                            ease: Power1.easeIn,
                          });
                        }else{
                          gsap.to(l, 0.5, {
                            x: G ,
                            ease: Power1.easeIn,
                          });
                        }
                        break;
                      case 3:
                        if(direction ==0){
                          gsap.to(l, 0.5, {
                            y: 0 ,
                            ease: Power1.easeIn,
                          });
                        }else{
                          gsap.to(l, 0.5, {
                            x: G ,
                            ease: Power1.easeIn,
                          });
                        }
                        break;
                    }
                  gsap.to(l, 0.5, {
                    rotation: -Math.random() * Math.PI,
                    ease: Power1.easeIn,
                    onComplete: i,
                  }),
                    gsap.to(l.scale, 0.5, {
                      x: 0,
                      y: 0,
                      ease: Power1.easeIn,
                    });
                }
                function i() {
                  l.visible = !1;
                }
                this.play = function (n, a) {
                  (l.visible = !0),
                    l.clear(),
                    (o = G * Math.random()),
                    (r = A * Math.random()),
                    gsap.delayedCall(n, e);
                };
                var o,
                  r,
                  a = n,
                  l = new PIXI.Graphics();
                a.addChild(l);
              };
              function o() {
                (l.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  direction = Math.round(Math.random());
                  originPlace = Math.floor(Math.random()*4);
                  r.setChildIndex(l, r.children.length - 1), (l.visible = !0);
                  for (
                    var n = Math.floor(5 * Math.random() + 5), a = 0;
                    a < n;
                    a++
                  ) {
                    var e;
                    (e = s[a] ? s[a] : new i(l)), (s[a] = e);
                    var t = null;
                    a == n - 1 && (t = o), e.play(0.06 * a, t);
                  }
                })();
              };
              var direction, originPlace;
              var e = this,
                r = n;
              this.id = a;
              var l = new PIXI.Container();
              r.addChild(l);
              var s = [];
            },
            //==========================================================
            //随机出现的圆形 #8
            function (n, a) {
              var i = function (n) {
                function e() {
                  var n = Math.min(G, A) * (0.05 * Math.random() + 0.014);
                  l.beginFill(L()),
                    l.drawCircle(0, 0, n),
                    (l.x = i),
                    (l.y = o),
                    (l.scale.x = 1),
                    (l.scale.y = 1),
                    (l.alpha = 0)
                    gsap.to(l, 0.5, {
                      alpha: 1,
                      ease: Bounce.easeOut,
                      //Elastic.easeOut.config(1, 0.3),
                      onComplete: a,
                    });
                }
                function a() {
                  gsap.to(l, 0.5, {
                    alpha: 0,
                    ease: Back.easeIn.config(1.7),
                    onComplete: t,
                    delay: 0.2,
                  });
                }
                function t() {
                  l.visible = !1;
                }
                this.play = function (n, a) {
                  (l.visible = !0),
                    l.clear(),
                    (i = G * Math.random()),
                    (o = A * Math.random()),
                    gsap.delayedCall(n, e);
                };
                var i,
                  o,
                  r = n,
                  l = new PIXI.Graphics();
                r.addChild(l);
              };
              function o() {
                (l.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  r.setChildIndex(l, r.children.length - 1), (l.visible = !0);
                  for (
                    var n = Math.floor(5 * Math.random() + 5), a = 0;
                    a < n;
                    a++
                  ) {
                    var e;
                    (e = s[a] ? s[a] : new i(l)), (s[a] = e);
                    var t = null;
                    a == n - 1 && (t = o), e.play(0.06 * a, t);
                  }
                })();
              };
              var e = this,
                r = n;
              this.id = a;
              var l = new PIXI.Container();
              r.addChild(l);
              var s = [];
            },
            //==========================================================
            //圆形条纹 #9
            function (n, a) {
              function o() {
                (l.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  (l.visible = !0),
                    r.setChildIndex(l, r.children.length - 1),
                    (d.container.mask = s),
                    d.play(o);
                  var n = d.size / 2;
                  (s.x = G / 2),
                    (s.y = A / 2),
                    s.clear(),
                    s.beginFill(0),
                    s.drawCircle(0, 0, n);
                  var a =
                      ((45 * Math.PI) / 180) * Math.floor(2 * Math.random()),
                    e =
                      a +
                      ((45 * Math.PI) / 180) *
                        Math.floor(4 * Math.random() - 2),
                    t = 0.3 * Math.random() + 1,
                    i = 0.3 * -Math.random() + 1;
                  gsap.fromTo(
                    d.container,
                    0.6,
                    { rotation: a },
                    { rotation: e, ease: Power2.easeOut }
                  ),
                    gsap.fromTo(
                      d.container.scale,
                      0.6,
                      { x: t, y: t },
                      { x: i, y: i, ease: Back.easeOut.config(1.7) }
                    ),
                    gsap.fromTo(
                      s.scale,
                      0.6,
                      { x: t, y: t },
                      { x: i, y: i, ease: Back.easeOut.config(1.7) }
                    );
                })();
              };
              var e = this,
                r = n;
              this.id = a;
              var l = new PIXI.Container();
              r.addChild(l);
              var s = new PIXI.Graphics();
              l.addChild(s);
              var d = new t(l, -1);
            },
            //==========================================================
            //扩大的多边形 #10
            function (n, a) {
              function d() {
                (c.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  h.setChildIndex(c, h.children.length - 1),
                    c.clear(),
                    (c.visible = !0),
                    c.lineStyle(5 * Math.random() + 3, L(), 1),
                    (c.x = G / 2),
                    (c.y = A / 2);
                  for (
                    var n = 0.6 * Math.min(G, A),
                      a = Math.floor(5 * Math.random()) + 3,
                      e = 360 / a,
                      t = ((0.5 * Math.max(G, A)) / n) * (1.6 + 0.6 / a),
                      i = 0;
                    i <= a;
                    i++
                  ) {
                    var o = (i * e * Math.PI) / 180,
                      r = n * Math.cos(o),
                      l = n * Math.sin(o);
                    0 == i ? c.moveTo(r, l) : c.lineTo(r, l);
                  }
                  var s = 0.3 * Math.random() + 0.6;
                  gsap.fromTo(
                    c.scale,
                    s,
                    { x: 0, y: 0 },
                    { x: t, y: t, onComplete: d, ease: Power2.easeOut }
                  ),
                    gsap.fromTo(
                      c,
                      s,
                      { rotation: Math.random() * Math.PI },
                      {
                        rotation: Math.random() * Math.PI,
                        ease: Power1.easeOut,
                      }
                    );
                })();
              };
              var e = this,
                h = n;
              this.id = a;
              var c = new PIXI.Graphics();
              h.addChild(c);
            },
            //==========================================================
            //绘制实心圆形 #11
            function (n, a) {
              function e() {
                (o.visible = !1),(square.visible = !1), C[t.id].push(t);
              }
              this.play = function () {
                !(function () {
                  i.setChildIndex(o, i.children.length - 1),
                    (o.visible = !0),
                    (square.clear()),
                    (square.visible = !0),
                    (o.x = G / 2),
                    (o.y = A / 2);
                    square.x = G/2;
                    square.y = A/2;
                  var n = L(),
                    a = Math.min(G, A) * (0.25 * Math.random() + 0.2);
                    sideLength = 2*Math.sin(Math.PI/4)*(a);
                  r.clear(),
                    r.beginFill(n),
                    r.drawCircle(0, 0, a),
                    square.drawRect(-sideLength/2, -sideLength/2, sideLength, sideLength);
                    o.mask = square;
                    l.play(a, e);
                })();
              };
              var t = this,
                i = n;
              this.id = a;
              var o = new PIXI.Container(),
                r = new PIXI.Graphics();
              var square = new PIXI.Graphics();
              i.addChild(o), o.addChild(r), i.addChild(square);
              var l = new d(o, r);
            },
            //==========================================================
            // 旋转的方形 #12
            function (n, a) {
              var u = function (n) {
                function t() {
                  var distance = o*0.3;
                  if(direction == 0){
                    l.x -=distance;
                    l2.x+=distance;
                  }else{
                    l.y-=distance;
                    l2.y+=distance;
                  }
                  gsap.to(l, 0.3, 
                    {alpha: 0,
                      ease: Power0.easeIn,
                      onComplete: a,
                      delay: 0.2});
                      gsap.to(l2, 0.3, 
                        {alpha: 0,
                          ease: Power0.easeIn,
                          delay: 0.2});
                }
                function a() {
                  (l2.visible = !1),(l.visible = !1), i && i();
                }
                (this.init = function (n, a, e, t) {
                  (_state = 0), (o = e), (r = t);
                  if(direction==0){
                    l.x = -o/2;
                    l.y = -o/2;
                    l2.x = 0;
                    l2.y = -o/2;
                  }else{
                    l.x = - o/2;
                    l.y = -o/2;
                    l2.x = - o/2;
                    l2.y = 0;
                  }
                }),
                  (this.play = function (n, a) {
                    (i = a),
                      l.clear();
                      l2.clear();
                      (l.visible = !0);
                      (l2.visible = !0);
                      if(direction==0){
                        l.beginFill(r);
                        l.drawRect(0, 0, o/2, o);
                        l2.beginFill(r);
                        l2.drawRect(0,0,o/2,o);
                      }else{
                        l.beginFill(r);
                        l.drawRect(0, 0, o, o/2);
                        l2.beginFill(r);
                        l2.drawRect(0,0,o,o/2);
                      }

                      l.alpha = 0;
                      l2.alpha = 0;
                      gsap.to(
                        l,
                        0.5,
                        {
                          alpha: 1,
                          ease: Bounce.easeOut,
                          onComplete: t
                        }
                      )
                      gsap.to(
                        l2,
                        0.5,
                        {
                          alpha: 1,
                          ease: Bounce.easeOut,
                        }
                      )
                  });
                var i,
                  o,
                  r,
                  e = n,
                  l = new PIXI.Graphics();
                var l2 = new PIXI.Graphics();
                e.addChild(l);
                e.addChild(l2);
              };
              function v() {
                (y.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  p.setChildIndex(y, p.children.length - 1),
                    (y.visible = !0),
                    (y.x = G / 2),
                    (y.y = A / 2);
                  var n = 1,
                  //Math.floor(8 * Math.random() + 6),
                    a = Math.min(G, A),
                    // * (0.25 * Math.random() + 0.25),
                    e = 360 / n,
                    t = a * (0.2 * Math.random() + 0.5),
                    i = L(),
                    o = (Math.PI / 2) * Math.floor(4 * Math.random()),
                    r = 1;
                  direction = Math.round(Math.random()); //0或1 
                  Math.random() < 0.5 && (r = -1);
                  for (var l = 0; l < n; l++) {
                    var s,
                      d = ((r * e * l + o) * Math.PI) / 180,
                      h = G/2,
                      c = A/2;
                    (s = w[l] ? w[l] : new u(y)), (w[l] = s);
                    var f = null;
                    l == n - 1 && (f = v),
                      s.init(h, c, t, i),
                      s.play(0.05 * l, f);
                  }
                })();
              };
              var direction;
              var e = this,
                p = n;
              this.id = a;
              var y = new PIXI.Container(),
                w = [];
              p.addChild(y);
            },
            //==========================================================
            // 环状出现然后随机消失的圆形 #13
            function (n, a) {
              var i = function (n) {
                function e() {
                  var n = Math.min(G, A) * (0.01 * Math.random() + 0.014);
                  l.beginFill(L()),
                    l.drawCircle(0, 0, n),
                    (l.x = oX),
                    (l.y = oY),
                    (l.scale.x = 0),
                    (l.scale.y = 0)
                    gsap.to(l, 0.5, {
                      x: i,
                      y: o,
                      ease: Power2.easeOut
                    });
                    gsap.to(l.scale, 0.25, {
                      x: 1,
                      y: 1,
                      ease: Elastic.easeOut.config(1, 0.3),
                      onComplete: a,
                    });
                }
                function a() {
                  gsap.to(l.scale, 0.25, {
                    x: 0,
                    y: 0,
                    ease: Back.easeIn.config(1.7),
                    onComplete: t
                  });
                }
                function t() {
                  l.visible = !1;
                }
                this.play = function (n, a, originX, originY) {
                  (l.visible = !0),
                    l.clear(),
                    (oX = originX*G),
                    (oY = originY*A),
                    (i = G * Math.random()),
                    (o = A * Math.random()),
                    gsap.delayedCall(n, e);
                };
                var oX,
                oY;
                var i,
                  o,
                  r = n,
                  l = new PIXI.Graphics();
                r.addChild(l);
              };
              function o() {
                (l.visible = !1), C[e.id].push(e);
              }
              this.play = function () {
                !(function () {
                  r.setChildIndex(l, r.children.length - 1), (l.visible = !0);
                  var originX = Math.round(Math.random());
                  var originY = Math.round(Math.random());
                  for (
                    var n = Math.floor(5 * Math.random() + 15), a = 0;
                    a < n;
                    a++
                  ) {
                    var e;
                    (e = s[a] ? s[a] : new i(l)), (s[a] = e);
                    var t = null;
                    a == n - 1 && (t = o), e.play(0, t, originX, originY);
                  }
                })();
              }; b
              var e = this,
                r = n;
              this.id = a;
              var l = new PIXI.Container();
              r.addChild(l);
              var s = [];
            },
            //==========================================================
            // 旋转的X #14
            function (n, a) {
              function i() {
                (r.visible = !1), C[e.id].push(e);
              }
              function endingAnimation(){
                gsap.to(l.scale, 0.3, { x: 0, ease: Power2.easeOut });
                gsap.to(s.scale, 0.3, { y: 0, ease: Power2.easeOut, onComplete:i });
              }
              this.play = function () {
                !(function () {
                  (r.visible = !0),
                    o.setChildIndex(r, o.children.length - 1),
                    (r.x = 0.2 * G + 0.6 * G * Math.random()),
                    (r.y = 0.2 * A + 0.6 * A * Math.random());
                  var n,
                    a = Math.max(G, A) * (0.1),
                    //e = (a / 10) * (0.5 + 0.8 * Math.random()),
                    t = L();
                  l.clear(),
                    l.beginFill(t),
                    l.drawRect(-a/2, -a / 2, a, a),
                    s.clear(),
                    s.beginFill(t),
                    s.drawRect(-a / 2, -a / 2, a, a),
                    (l.y = 0),
                    (l.x = 0,
                    (s.x = 0),
                    (s.y = 0),
                    (r.rotation = (45 * Math.PI) / 180),
                    (l.scale.x = 0),
                    (l.scale.y = 0),
                    (s.scale.x = 0),
                    (s.scale.y = 0),
                    (n =
                      Math.random() < 0.5
                        ? (-135 * Math.PI) / 180
                        : (215 * Math.PI) / 180));
                    gsap.to(
                      l.scale, 0.4,
                      { x: 0.5, y: 20, ease: Power2.easeOut }
                    );
                    gsap.to(
                      s.scale, 0.4,
                      { y: 0.5, x: 20, ease: Power2.easeOut, onComplete: endingAnimation}
                    );
                })();
              };
              var e = this,
                o = n;
              this.id = a;
              var r = new PIXI.Container(),
                l = new PIXI.Graphics(),
                s = new PIXI.Graphics();
              o.addChild(r), r.addChild(l), r.addChild(s);
            },
            //==========================================================
            // 随机线 #15
            function (n, a) {
              function o() {
                if (r < ++c)
                  switch (l) {
                    case 0:
                      l = 1;
                      var n = h[0];
                      (f.x = n.x), (f.y = n.y), (c = 0), o();
                      break;
                    case 1:
                      l = 2;
                  }
                else
                  gsap.to(f, 0.1, {
                    x: h[c].x,
                    y: h[c].y,
                    onComplete: o,
                    onUpdate: e,
                    ease: Power1.easeOut,
                  });
              }
              function e() {
                switch ((u.clear(), u.lineStyle(s, d, 1), l)) {
                  case 0:
                    u.moveTo(h[0].x, h[0].y);
                    for (var n = 1; n < c; n++) u.lineTo(h[n].x, h[n].y);
                    u.lineTo(f.x, f.y);
                    break;
                  case 1:
                    for (u.moveTo(f.x, f.y), n = c; n <= r; n++)
                      u.lineTo(h[n].x, h[n].y);
                }
              }
              this.play = function () {
                !(function () {
                  u.clear(),
                    (u.visible = !0),
                    Math.random() < 0.5
                      ? ((u.x = 0), (u.y = 0), (u.rotation = 0))
                      : ((u.x = G), (u.y = A), (u.rotation = Math.PI)),
                    (c = l = 0),
                    (r = Math.floor(3 * Math.random()) + 3),
                    (s = 20 * Math.random() + 2),
                    (d = L());
                  var n,
                    a = Math.random() < 0.5;
                  n = a ? G / r : A / r;
                  for (var e = 0; e <= r; e++) {
                    var t;
                    a
                      ? ((t = { x: e * n, y: A * Math.random() }),
                        0 == e && (t.x -= 10),
                        e == r && (t.x += 10))
                      : ((t = { y: e * n, x: G * Math.random() }),
                        0 == e && (t.y -= 10),
                        e == r && (t.y += 10)),
                      (h[e] = t);
                  }
                  var i = h[0];
                  (f.x = i.x), (f.y = i.y), o();
                })();
              };
              var t = n;
              this.id = a;
              var r,
                l,
                s,
                d,
                h = [],
                c = 0,
                f = { x: 0, y: 0 },
                u = new PIXI.Graphics();
              t.addChild(u);
            },
            //==========================================================
            // 方形条纹 #16
            t,
          ],
          I = [
            function (n, a) {
              function d() {
                y.clear(),
                  y.beginFill(c),
                  y.moveTo(u.pos.b1.x, u.pos.b1.y),
                  y.lineTo(u.pos.b0.x, u.pos.b0.y);
                for (var n = 0; u.pos["p" + n]; n++) {
                  var a = u.pos["p" + n];
                  y.lineTo(a.x, a.y);
                }
                y.endFill();
              }
              function h() {
                F == w && T.setColor(c, p - 1),
                  (y.visible = !1),
                  C[u.id].push(u);
              }
              this.play = function () {
                !(function () {
                  F = w;
                  var n = X();
                  (c = P[n]),
                    $("#about").css("background-color", "#" + c.toString(16)),
                    $("#option").css("background-color", "#" + c.toString(16)),
                    Math.random() < 0.3 && T.flash(p),
                    (O = n),
                    y.clear(),
                    (y.visible = !0),
                    (p = v.children.length - 1 - Math.floor(2 * Math.random())),
                    v.setChildIndex(y, p);
                  var a = Math.random() < 0.5,
                    e = Math.floor(4 * Math.random()) + 1;
                  u.pos = {};
                  var t = 0;
                  a
                    ? ((t = A / e),
                      (u.pos.b0 = { x: 0, y: 0 }),
                      (u.pos.b1 = { x: 0, y: A }))
                    : ((t = G / e),
                      (u.pos.b0 = { x: 0, y: 0 }),
                      (u.pos.b1 = { x: G, y: 0 })),
                    Math.random() < 0.5
                      ? ((y.rotation = 0), (y.x = 0), (y.y = 0))
                      : ((y.rotation = Math.PI), (y.x = G), (y.y = A));
                  for (var i = (f = 0); i <= e; i++) {
                    var o = { x: 0, y: 0 },
                      r = 0;
                    0 != i && i != e && (r = (t / 4) * Math.random() - t / 8),
                      a ? (o.y = t * i + r) : (o.x = t * i + r),
                      (u.pos["p" + i] = o);
                    var l,
                      s = 0.4 * Math.random() + 0.3;
                    (f = 2),
                      (l = a ? { x: G } : { y: A }),
                      gsap.to(u.pos["p" + i], s, l);
                  }
                  (u.progress = 0),
                    gsap.to(u, f, {
                      progress: 1,
                      ease: Power0.easeNone,
                      onUpdate: d,
                      onComplete: h,
                    });
                })();
              };
              var c,
                f,
                u = this,
                v = n;
              (this.id = a), (this.progress = 0), (this.pos = {});
              var p = 0,
                y = new PIXI.Graphics();
              v.addChild(y);
              var w = Math.floor(aidn.util.getTime());
            },
          ];
        aidn.util.shuffleArray(m);
        for (
          var b, x = 16 * Math.random(), C = [], g = 0;
          g < m.length + I.length;
          g++
        )
          C[g] = [];
        var T,
          P = [
            0x7dcce1, 0xfbd475, 0xf2e1ec, 0x463840, 0xed4444, 0xe4885f, 0x383745,
            0xe98799, 0x6480c1, 0x99e1e6, 0xb09882, 0xc8c0c6,
          ],
          k = [
            0x7dcce1, 0xfbd475, 0xf2e1ec, 0x463840, 0xed4444, 0xe4885f, 0x383745,
            0xe98799, 0x6480c1, 0x99e1e6, 0xb09882, 0xc8c0c6,
          ],
          _ = P.length,
          O = 0;
        function L() {
          var n = Math.random();
          return k[X()];
        }
        function X() {
          for (var n = 0; n < 10; n++) {
            var a = Math.floor(_ * Math.random());
            if (2 < Math.abs(O - a)) break;
          }
          return a;
        }
        var F = 0;
      })(),
      S = !1,
      D = 0,
      U = "off" == aidn.util.getCookie("fb"),
      T = "off" == aidn.util.getCookie("bt");
    n(),
      o(),
      aidn.util.webaudio
        ? ($("#ng").css("display", "none"),
          $(".ok").css("display", "block"),
          E && $("#scene_main .attention").html("滑动·点击屏幕或按下任意键"),
          y || $("#scene_top .attention").text("* 调高音量感受节奏吧！"))
        : ($("#ng").css("display", "block"),
          $(".ok").css("display", "none"),
          y ||
            $("#ng .atten").html(
              "Sorry,<br>your device or browser doesn't support this site."
            )),
      (PIXI.utils._saidHello = !0),
      aidn.window.resize(a);
  },
  WebAudioManager = function () {
    function i() {
      if ((a++, (h.now = a), s && s(a, o), o <= a)) l && l();
      else {
        var n = new aidn.WebAudio();
        n.load(d[r[a]], i), (t[a] = n);
      }
    }
    (this.load = function (n, a, e, t) {
      (l = e),
        (s = t),
        (o = (r = a).length),
        (h.length = o),
        $.getJSON(n, function (n) {
          (d = n), i();
        });
    }),
      (this.play = function (n, a, e) {
        t[n].play(0, !1, null, 0, e, a);
      }),
      (this.stop = function (n) {
        n < o && t[n].stop();
      });
      (this.stopAll = function () {
        for(var i = 0; i<t.length; i++){
          t[i].stop();
        }
      });
    var o,
      r,
      l,
      s,
      d,
      h = this,
      a = -1,
      t = [];
    var cot = 0;
    (this.length = 0), (this.now = 0);
  };
