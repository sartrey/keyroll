using Keyroll.TDS;
using Sartrey;
using Sartrey.UI.WinForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class MainUI : Sartrey.UI.WinForms.View
    {
        public MainUI()
        {
            InitializeComponent();
            Text = "Keyroll";
        }

        protected override void OnViewClosing(FormClosingEventArgs e)
        {
            if (e.CloseReason != CloseReason.ApplicationExitCall)
            {
                e.Cancel = true;
                Application.Exit();
            }
            base.OnViewClosing(e);
        }

        private void BtnCreateStorage_Click(object sender, EventArgs e)
        {
            var dlg = new SaveFileDialog();
            dlg.Filter = "TDS存储|*.tds";
            var result = dlg.ShowDialog();
            if (result != DialogResult.OK)
                return;
            var key_ui = new KeyUI();
            var window = new Window(key_ui);
            window.ShowDialog();
            result = window.Result;
            if (result != DialogResult.OK)
                return;
            
            var storage = Storage.Create(dlg.FileName, key_ui.NewKey);
            storage.Commit();
            Runtime.Instance.Storage = storage;
        }

        private void BtnLoadStorage_ButtonClick(object sender, EventArgs e)
        {
            var dlg = new OpenFileDialog();
            dlg.Filter = "TDS存储|*.tds";
            var result = dlg.ShowDialog();
            if (result != DialogResult.OK)
                return;
            var key_ui = new KeyUI();
            var window = new Window(key_ui);
            window.ShowDialog();
            result = window.Result;
            if (result != DialogResult.OK)
                return;

            var storage = Storage.Load(dlg.FileName, key_ui.NewKey);
            if (storage == null)
            {
                MessageBox.Show("failed to load storage");
                return;
            }
            Runtime.Instance.Storage = storage;
        }

        private void BtnSaveStorage_Click(object sender, EventArgs e)
        {
            Runtime.Instance.Storage.Commit();
        }

        private void BtnAddAsset_Click(object sender, EventArgs e)
        {
            var selectfiles_ui = new SelectFilesUI();
            var window = new Window(selectfiles_ui);
            window.ShowDialog();
            var result = window.Result;
            if (result != DialogResult.OK)
                return;
            var files = selectfiles_ui.Files;
            var storage = Runtime.Instance.Storage;
            foreach (var file in files) 
            {
                var asset = Asset.FromFile(file);
                var assets = storage.GetAssetByName(asset.Hash);
                if (assets.Count() > 0)
                    continue;
                storage.AddAsset(asset);
                asset.Import(file);
            }
            storage.Commit();
        }
    }
}
