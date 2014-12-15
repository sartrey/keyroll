using Keyroll.TDS;
using Sartrey.UI.WinForms;
using System;
using System.IO;
using System.Linq;
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

        public void RefreshData() 
        {
            var storage = Runtime.Instance.Storage;
            LsvAssets.Items.Clear();
            foreach (var asset in storage.Assets)
            {
                var lvi = new ListViewItem(
                    new string[] { asset.Name, asset.Type });
                lvi.Tag = asset.Id;
                LsvAssets.Items.Add(lvi);
            }
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
            RefreshData();
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
            RefreshData();
        }

        private void BtnRemoveAsset_Click(object sender, EventArgs e)
        {
            var items = LsvAssets.SelectedItems;
            if (items.Count == 0)
                return;
            var storage = Runtime.Instance.Storage;
            foreach (ListViewItem lvi in items) 
            {
                var id = lvi.Tag as string;
                var asset = storage[id];
                asset.Detach();
                storage.RemoveAsset(asset);
            }
            storage.Commit();
            RefreshData();
        }

        private void BtnExportAsset_Click(object sender, EventArgs e)
        {
            var items = LsvAssets.SelectedItems;
            if (items.Count == 0)
                return;
            var dlg = new FolderBrowserDialog();
            var result = dlg.ShowDialog();
            if (result != DialogResult.OK)
                return;
            var storage = Runtime.Instance.Storage;
            foreach (ListViewItem lvi in items)
            {
                var id = lvi.Tag as string;
                var asset = storage[id];
                var path = Path.Combine(dlg.SelectedPath, asset.Name);
                asset.Export(path, true);
            }
        }

        private void BtnPreviewAsset_Click(object sender, EventArgs e)
        {
            var items = LsvAssets.SelectedItems;
            if (items.Count != 1)
                return;
            var storage = Runtime.Instance.Storage;
            var item = items[0];
            var id = item.Tag as string;
            var asset = storage[id];
            var path = Path.Combine(Application.StartupPath, "temp", asset.Name);
            asset.Export(path, true);
            var helper = new Shell.ShellHelper();
            var process = helper.Open(path);
        }
    }
}
